import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { Player } from '../entity/player/player';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { PeoplePlayingService } from '../people-playing/people-playing.service';

@Component({
  selector: 'app-load-game',
  standalone: true,
  imports: [NgFor],
  templateUrl: './load-game.component.html',
  styleUrl: './load-game.component.css',
})
export class LoadGameComponent implements OnInit {
  constructor(
    private router: Router,
    public playerStorageService: PlayerStorageService
  ) {}
  ngOnInit(): void {}

  changeScreen(id: string): void {
    let idParam: Params = { id: id };
    this.router.navigate(['/preparation-screen'], { queryParams: idParam });
  }
}
