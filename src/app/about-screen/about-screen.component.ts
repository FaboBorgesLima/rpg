import { Component, OnInit } from '@angular/core';
import { PeoplePlayingService } from '../people-playing/people-playing.service';
import { GameClassesNames } from '../game-class/game-class';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-about-screen',
  standalone: true,
  imports: [NgFor],
  templateUrl: './about-screen.component.html',
  styleUrl: './about-screen.component.css',
})
export class AboutScreenComponent implements OnInit {
  constructor(private peoplePlayingService: PeoplePlayingService) {}

  peopleSaves: { xp: number; gameClass: GameClassesNames }[] = [];

  savesN: number = 0;
  ngOnInit(): void {
    this.peoplePlayingService.getPeoplePlaying().then((playersData) => {
      const playerDataKeys = Object.keys(playersData.saves);

      this.savesN = playerDataKeys.length;

      for (const key of playerDataKeys) {
        const player = playersData.saves[key];

        this.peopleSaves.push({ gameClass: player.gameClass, xp: player.xp });
      }

      this.peopleSaves.sort((last, actual) => last.xp - actual.xp);
    });
  }
  deleteAllSaves(): void {
    this.peoplePlayingService.deleteAll().then(() => {
      console.log('deleted');
    });
  }
}
