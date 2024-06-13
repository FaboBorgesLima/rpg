import { LifeBarComponent } from '../life-bar/life-bar.component';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { Player } from '../entity/player/player';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MobEntityFactoryService } from '../mob-entity-factory/mob-entity-factory.service';
import { MobEntity } from '../entity/mob-entity/mob-entity';

@Component({
  selector: 'app-fight-screen',
  standalone: true,
  imports: [LifeBarComponent, RouterLink],
  templateUrl: './fight-screen.component.html',
  styleUrl: './fight-screen.component.css',
  host: { class: 'grow' },
})
export class FightScreenComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    public playerStorage: PlayerStorageService,
    private router: Router,
    private mobEntityFactory: MobEntityFactoryService
  ) {}

  id: string = '';
  floor: number = 1;
  player!: Player;
  mob: MobEntity = MobEntity.getDefault();

  ngOnInit(): void {
    const urlId = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.id = urlId ? urlId : '';

    const player = this.playerStorage.getById(parseInt(this.id));

    if (!player) {
      this.router.navigate(['']);
      return;
    }

    this.player = player;

    console.log(this.player.getGameClass().getLevel().getLevelAmount());

    this.mobEntityFactory
      .factory(this.player.getGameClass().getLevel().getLevelAmount())
      .subscribe({
        next: (newMob) => {
          this.mob = newMob;
        },
      });

    if (!this.id) {
      this.router.navigate(['']);
      return;
    }
  }

  // TODO: we need to move most of the combat logic into some class, i'm thinking about creating a "entity-action" object so a action can respond to a action (defending a attack, attaking a defense, running a attack,etc...)
  onAttack() {
    this.mob
      .getGameClass()
      .receiveAttack(this.player.getGameClass().getAttack());

    this.onRound();
  }

  onRound() {
    if (!this.mob.getGameClass().isAlive()) {
      const xpPlayer = this.player.getGameClass().getLevel().getXp();
      const xpMob = this.mob.getGameClass().getLevel().getXp();

      this.player
        .getGameClass()
        .getLevel()
        .setXp(xpPlayer + xpMob);

      this.playerStorage.update(this.player);
      this.router.navigate(['preparation-screen'], {
        queryParams: { id: this.id },
      });
      return;
    }

    if (!this.player.getGameClass().isAlive()) {
      const xpPlayer = this.player.getGameClass().getLevel().getXp();
      const xpMob = this.mob.getGameClass().getLevel().getXp();

      this.player
        .getGameClass()
        .getLevel()
        .setXp(xpPlayer - xpMob);

      this.playerStorage.update(this.player);
      this.router.navigate(['preparation-screen'], {
        queryParams: { id: this.id },
      });
      return;
    }

    this.player
      .getGameClass()
      .receiveAttack(this.mob.getGameClass().getAttack());
  }
}
