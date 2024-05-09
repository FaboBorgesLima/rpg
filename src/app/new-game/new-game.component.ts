import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [RouterLink, IconsComponent],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css'
})
export class NewGameComponent {}

