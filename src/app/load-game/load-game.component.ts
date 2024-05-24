import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, Params } from '@angular/router';
import { Player } from '../player/player';
import { PlayerStorageService } from '../player-storage/player-storage.service';

@Component({
  selector: 'app-load-game',
  standalone: true,
  imports: [NgFor],
  templateUrl: './load-game.component.html',
  styleUrl: './load-game.component.css',
})
export class LoadGameComponent {
  constructor(
    private router: Router,
    public playerStorageService: PlayerStorageService
  ) {}

  changeScreen(id: string): void {
    let idParam: Params = { id: id };
    this.router.navigate(['/preparation-screen'], { queryParams: idParam });
  }
}
