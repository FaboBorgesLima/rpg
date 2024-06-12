import { LifeBarComponent } from '../life-bar/life-bar.component';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { Player } from './../player/player';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-fight-screen',
  standalone: true,
  imports: [LifeBarComponent, RouterLink],
  templateUrl: './fight-screen.component.html',
  styleUrl: './fight-screen.component.css'
})
export class FightScreenComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    public playerStorage: PlayerStorageService,
    private router: Router
  ) {}
  id: string = '';
  player!: Player;

  ngOnInit(): void {
    const urlId = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.id = urlId ? urlId : '';

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
