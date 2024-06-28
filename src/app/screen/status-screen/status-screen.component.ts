import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlayerStorageService } from '../../player-storage/player-storage.service';
import { Player } from '../../entity/player/player';
import { StatusComponent } from '../../status/status.component';

@Component({
  selector: 'app-status-screen',
  standalone: true,
  imports: [StatusComponent, RouterLink],
  templateUrl: './status-screen.component.html',
  styleUrl: './status-screen.component.css',
})
export class StatusScreenComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private playerStorage: PlayerStorageService
  ) {}
  ngOnInit(): void {
    const tryId = this.activatedRoute.snapshot.queryParamMap.get('id');

    if (!tryId) return;

    this.id = tryId;

    const tryPlayer = this.playerStorage.getById(parseInt(this.id));

    if (!tryPlayer) return;

    this.player = tryPlayer;
  }

  player: Player = this.playerStorage.getDefaultPlayer(0);
  id: string = '';
}
