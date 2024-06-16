import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { Player } from '../entity/player/player';
import { NgFor } from '@angular/common';
import { GameItemFactoryService } from '../game-item-factory/game-item-factory.service';
import { ShopItemCardComponent } from '../shop-item-card/shop-item-card.component';
import { GameItem, ItemType } from '../game-item/game-item';

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
    public gameItemsFactory: GameItemFactoryService
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
        return this.removeAlreadyBuyed(this.gameItemsFactory.getWeapons());
      case 'armor':
        return this.removeAlreadyBuyed(this.gameItemsFactory.getArmors());
    }
  }

  removeAlreadyBuyed(items: GameItem[]): GameItem[] {
    const filteredItems: GameItem[] = [];

    for (const item of items) {
      if (!this.containsInPlayerItems(item)) filteredItems.push(item);
    }

    return filteredItems;
  }

  containsInPlayerItems(item: GameItem): boolean {
    if (this.player.armor.getName() == item.getName()) return true;

    if (this.player.weapon.getName() == item.getName()) return true;

    for (const playerItem of this.player.gameItems) {
      if (playerItem.getName() == item.getName()) return true;
    }

    return false;
  }
}
