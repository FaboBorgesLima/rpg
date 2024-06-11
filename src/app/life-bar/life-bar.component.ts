import { Component, OnInit } from '@angular/core';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../player/player';

@Component({
  selector: 'app-life-bar',
  standalone: true,
  imports: [],
  templateUrl: './life-bar.component.html',
  styleUrl: './life-bar.component.css'
})
export class LifeBarComponent implements OnInit {
  constructor (
    private playerStorage: PlayerStorageService,
    private router: Router,
    private activeLink :ActivatedRoute,
  ) {}

  remainingHp: number = 0;
  player!: Player;

  ngOnInit(): void {
    const urlId = this.activeLink.snapshot.paramMap.get("id");
    let playerId: string = "";
    playerId = urlId ? urlId : "";
    
    if(!playerId) {
      this.router.navigate([""]);
      return;
    }
    const player = this.playerStorage.getById(parseInt(playerId));

    if(!player) {
      this.router.navigate([""]);
      return;
    }

    this.player = player;

  }

  // public calcLeftHp(damage: number) {
  //   this.player
  // }

}
