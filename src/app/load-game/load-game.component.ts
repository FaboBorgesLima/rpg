import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, Params } from '@angular/router';
import { Player } from '../player/player';

@Component({
  selector: 'app-load-game',
  standalone: true,
  imports: [NgFor],
  templateUrl: './load-game.component.html',
  styleUrl: './load-game.component.css',
})
export class LoadGameComponent {
  Player = Player;

  constructor(private router: Router) {}

  changeScreen(id: string): void {
    let idParam: Params = { id: id };
    this.router.navigate(['/preparation-screen'], { queryParams: idParam });
  }
}
