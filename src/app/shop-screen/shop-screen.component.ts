import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { Player } from '../entity/player/player';
import { NgFor } from '@angular/common';
import { GameItemFactoryService } from '../game-item-factory/game-item-factory.service';
import { ShopItemCardComponent } from '../shop-item-card/shop-item-card.component';
import { GameItem, ItemType } from '../game-item/game-item';
import { GameItemFilterService } from '../game-item-filter/game-item-filter.service';

@Component({
  selector: 'app-shop-screen',
  standalone: true,
  imports: [NgFor, ShopItemCardComponent],
  templateUrl: './shop-screen.component.html',
  styleUrl: './shop-screen.component.css',
})
export class ShopScreenComponent implements OnInit {
  id = '';

  filterBy: ItemType = 'usable';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private playerStorage: PlayerStorageService,
    public gameItemsFactory: GameItemFactoryService,
    public gameItemFilter: GameItemFilterService
  ) {}
  player: Player = this.playerStorage.getDefaultPlayer(0);

  ngOnInit(): void {
    const tryId = this.activatedRoute.snapshot.queryParamMap.get('id');
    console.log(this.activatedRoute.snapshot.queryParamMap.get('id'));

    if (!tryId) {
      this.router.navigate(['load-game']);
      return;
    }

    this.id = tryId;

    const tryPlayer = this.playerStorage.getById(parseInt(this.id));

    if (!tryPlayer) {
      this.router.navigate(['load-game']);
      return;
    }

    this.player = tryPlayer;
  }

  getItemsFiltered(by: ItemType): GameItem[] {
    switch (by) {
      case 'usable':
        return this.gameItemsFactory.getUsables();
      case 'weapon':
        return this.gameItemFilter.removeAlreadyBuyed(
          this.gameItemsFactory.getWeapons(),
          this.player
        );
      case 'armor':
        return this.gameItemFilter.removeAlreadyBuyed(
          this.gameItemsFactory.getArmors(),
          this.player
        );
    }
  }
}
