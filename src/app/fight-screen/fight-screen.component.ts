import { LifeBarComponent } from '../life-bar/life-bar.component';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { Player } from '../entity/player/player';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MobEntityFactoryService } from '../mob-entity-factory/mob-entity-factory.service';
import { MobEntity } from '../entity/mob-entity/mob-entity';
import { BattleStorageService } from '../battle-storage/battle-storage.service';

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
    private mobEntityFactory: MobEntityFactoryService,
    private battleStorageService: BattleStorageService
  ) {}

  id: string = '';
  floor: number = 0;
  player: Player = this.playerStorage.getDefaultPlayer(0);
  mob: MobEntity = MobEntity.getDefault();

  ngOnInit(): void {
    const urlId = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.id = urlId ? urlId : '';

    const battleLoader = this.battleStorageService.loadBattle(
      parseInt(this.id)
    );
    if (!battleLoader) {
      const player = this.playerStorage.getById(parseInt(this.id));

      if (!player) {
        this.router.navigate(['']);
        return;
      }

      this.player = player;

      this.floor = this.player.getGameClass().getLevel().getLevelAmount();

      this.mobEntityFactory.createFactory(this.floor).subscribe({
        next: (newMob) => {
          this.mob = newMob;
          this.battleStorageService.saveBattle(this.player, this.mob);
        },
      });

      if (!this.id) {
        this.router.navigate(['load-game']);
      }

      return;
    }

    battleLoader.subscribe({
      next: ([player, mob]) => {
        this.player = player;
        this.mob = mob;
      },
    });
  }

  onRound() {
    // randomize mob.action
    this.mob.setThoughtAction(this.player);

    this.mob.reciveAction(this.player);

    this.player.reciveAction(this.mob);

    this.battleStorageService.saveBattle(this.player, this.mob);

    if (
      this.player.action == 'run' &&
      this.player.getRunAwayChance(this.mob) > Math.random()
    ) {
      this.battleStorageService.endBattle(parseInt(this.id));
      alert(`you run away from ${this.mob.getName()}`);
      this.router.navigate(['preparation-screen'], {
        queryParams: { id: this.id },
      });
      return;
    }

    if (
      this.mob.action == 'run' &&
      this.mob.getRunAwayChance(this.player) > Math.random()
    ) {
      this.battleStorageService.endBattle(parseInt(this.id));
      alert(`${this.mob.getName()} run away from you`);
      this.router.navigate(['preparation-screen'], {
        queryParams: { id: this.id },
      });
      return;
    }

    if (!this.mob.isAlive()) {
      this.battleStorageService.endBattle(parseInt(this.id));
      const playerXp = this.player.getGameClass().getLevel().getXp();
      const monsterXp = this.mob.getGameClass().getLevel().getXp();
      const monsterGold = this.mob.getGold().getAmount();

      this.player
        .getGameClass()
        .getLevel()
        .setXp(playerXp + monsterXp);

      this.player.getGold().add(monsterGold);

      this.player.resetRemainingLife();

      this.playerStorage.update(this.player);

      alert(
        `you killed the beast, you won ${monsterXp}xp and ${monsterGold} gold`
      );

      this.router.navigate(['preparation-screen'], {
        queryParams: { id: this.id },
      });

      return;
    }
    if (!this.player.isAlive()) {
      this.battleStorageService.endBattle(parseInt(this.id));
      const playerXp = this.player.getGameClass().getLevel().getXp();
      const monsterXp = this.mob.getGameClass().getLevel().getXp();

      this.player
        .getGameClass()
        .getLevel()
        .setXp(playerXp - monsterXp);

      this.player.resetRemainingLife();

      this.playerStorage.update(this.player);

      alert(`you died, you lost ${monsterXp}xp`);

      this.router.navigate(['preparation-screen'], {
        queryParams: { id: this.id },
      });

      return;
    }
  }
}
