import { Component } from '@angular/core';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-load-game',
  standalone: true,
  imports: [],
  templateUrl: './load-game.component.html',
  styleUrl: './load-game.component.css'
})
export class LoadGameComponent {
  constructor(private router: Router) {}

  changeScreen(id: string): void {
    let idParam: Params = { id: id };
    this.router.navigate(["/preparation-screen"], { queryParams: idParam });
  }
}
