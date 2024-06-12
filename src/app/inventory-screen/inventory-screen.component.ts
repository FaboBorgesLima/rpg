import { Component } from '@angular/core';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { Player } from '../player/player';
import { ActivatedRoute, Router } from '@angular/router';
import { GameItemCardComponent } from '../game-item-card/game-item-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-inventory-screen',
  standalone: true,
  imports: [GameItemCardComponent, NgFor],
  templateUrl: './inventory-screen.component.html',
  styleUrl: './inventory-screen.component.css',
})
export class InventoryScreenComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    public playerStorageService: PlayerStorageService,
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

    const player = this.playerStorageService.getById(parseInt(this.id));

    if (!player) {
      this.router.navigate(['']);
      return;
    }

    this.player = player;

    this.player.gameItems
  }
}
