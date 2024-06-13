import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IconsComponent } from '../icons/icons.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GameClassesNames } from '../game-class/game-class';
import { Player } from '../entity/player/player';
import { GameClassFactoryService } from '../game-class-factory/game-class-factory.service';
import { PlayerStorageService } from '../player-storage/player-storage.service';

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [RouterLink, IconsComponent, ReactiveFormsModule],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css',
})
export class NewGameComponent {
  constructor(
    public gameClassFactoryService: GameClassFactoryService,
    public playerStorageService: PlayerStorageService,
    private router: Router
  ) {}
  form = new FormGroup({
    name: new FormControl(''),
    gameClass: new FormControl<GameClassesNames>('warrior'),
  });

  Player = Player;
  createPlayer() {
    const player = this.playerStorageService.create(
      this.getGameClassFromForm(this.form),
      this.getNameFromForm(this.form)
    );

    this.router.navigate(['preparation-screen'], {
      queryParams: { id: player.getId() },
    });
  }

  getNameFromForm(form: typeof this.form): string {
    let name = form.get('name')?.value;
    name = name ? name : '';

    return name;
  }

  getGameClassFromForm(form: typeof this.form): GameClassesNames {
    let gameClass = form.get('gameClass')?.value;
    gameClass = gameClass ? gameClass : 'warrior';

    return gameClass;
  }
}
