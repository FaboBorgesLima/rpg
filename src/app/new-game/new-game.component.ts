import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconsComponent } from '../icons/icons.component';
import { FormControl, NgModel, ReactiveFormsModule } from '@angular/forms';
import { GameClassesNames } from '../game-class/game-class';
import { Player } from '../player/player';
import { GameClassFactoryService } from '../game-class-factory/game-class-factory.service';

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [RouterLink, IconsComponent, ReactiveFormsModule],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css',
})
export class NewGameComponent {
  constructor(public gameClassFactoryService: GameClassFactoryService) {}
  name = new FormControl('');
  gameClass = new FormControl<GameClassesNames>('warrior');

  Player = Player;
  createPlayer() {
    Player.create(
      this.gameClass.value ? this.gameClass.value : 'warrior',
      this.name.value ? this.name.value : ''
    );
  }
}
