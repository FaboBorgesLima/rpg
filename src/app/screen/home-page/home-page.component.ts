import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlayerStorageService } from '../../player-storage/player-storage.service';
import { NgIf } from '@angular/common';
import { PeoplePlayingService } from '../../people-playing/people-playing.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  host: { class: 'grow flex' },
})
export class HomePageComponent implements OnInit {
  constructor(
    public playerStorageService: PlayerStorageService,
    private peoplePlayingService: PeoplePlayingService
  ) {}
  ngOnInit(): void {
    this.peoplePlayingService.getPeoplePlaying().then((db) => {
      console.log(db);
    });
  }
}
