import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { Player } from '../entity/player/player';

@Component({
  selector: 'app-preparation-screen',
  standalone: true,
  imports: [],
  templateUrl: './preparation-screen.component.html',
  styleUrl: './preparation-screen.component.css',
  host: { class: 'grow flex flex-col' },
})
export class PreparationScreenComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    public playerStorage: PlayerStorageService,
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

    const player = this.playerStorage.getById(parseInt(this.id));

    if (!player) {
      this.router.navigate(['']);
      return;
    }

    this.player = player;
  }

  public toFight(): void {
    this.router.navigate(['fight-screen'], {
      queryParams: { id: this.id },
    });
  }

  public goToInventory(): void {
    const idParam: Params = { id: this.id };
    this.router.navigate(['/inventory'], { queryParams: idParam });
  }
}
