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

    this.mobEntityFactory.factory().subscribe({
      next: (newMob) => {
        this.mob = newMob;
        console.log(this.mob);
      },
    });

    if (!this.id) {
      this.router.navigate(['']);
      return;
    }

    const player = this.playerStorage.getById(parseInt(this.id));

    if (!player) {
      this.router.navigate(['']);
      return;
    }

    this.player! = player;
  }
}
