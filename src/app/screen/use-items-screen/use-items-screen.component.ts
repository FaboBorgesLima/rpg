import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BattleStorageService } from '../../battle-storage/battle-storage.service';
import { Player } from '../../entity/player/player';
import { PlayerStorageService } from '../../player-storage/player-storage.service';
import { UseItemCardComponent } from '../../use-item-card/use-item-card.component';
import { NgFor } from '@angular/common';
import { GameItemFilterService } from '../../game-item-filter/game-item-filter.service';
import { ShopItemCardComponent } from '../../shop-item-card/shop-item-card.component';

@Component({
  selector: 'app-use-items-screen',
  standalone: true,
  imports: [UseItemCardComponent, NgFor, RouterLink],
  templateUrl: './use-items-screen.component.html',
  styleUrl: './use-items-screen.component.css',
  host: {
    class: 'grow flex flex-col',
  },
})
export class UseItemsScreenComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private battleStorage: BattleStorageService,
    private playerStorage: PlayerStorageService,
    public gameItemsFilter: GameItemFilterService
  ) {}
  id: string = '';
  player: Player = this.playerStorage.getDefaultPlayer(0);
  ngOnInit(): void {
    const tryId = this.activatedRoute.snapshot.queryParamMap.get('id');

    if (!tryId) return;

    this.id = tryId;

    const tryPlayer = this.battleStorage.getPlayerWithStatusById(
      parseInt(this.id)
    );

    if (!tryPlayer) return;

    this.player = tryPlayer;
  }
}
