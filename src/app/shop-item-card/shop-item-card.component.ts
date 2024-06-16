import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../entity/player/player';
import { GameItem } from '../game-item/game-item';
import { NgIf } from '@angular/common';
import { GameItemFactoryService } from '../game-item-factory/game-item-factory.service';
import { PlayerStorageService } from '../player-storage/player-storage.service';

@Component({
  selector: 'app-shop-item-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './shop-item-card.component.html',
  styleUrl: './shop-item-card.component.css',
})
export class ShopItemCardComponent {
  @Input({ required: true }) player!: Player;
  @Output() playerChange = new EventEmitter<Player>();

  @Input({ required: true }) item!: GameItem;
  constructor(
    private gameItemFactory: GameItemFactoryService,
    private playerStorage: PlayerStorageService
  ) {}

  getCountOnInventory(player: Player): number {
    let count = 0;
    player.gameItems.forEach((playerItem) => {
      if (playerItem.getName() == this.item.getName()) count++;
    });

    return count;
  }

  onBuy(): void {
    if (this.player.getGold().canBuy(this.item.getPrice())) {
      this.player.gameItems.push(
        this.gameItemFactory.factory(this.item.getName())
      );

      this.player.getGold().minus(this.item.getPrice());

      this.playerStorage.update(this.player);
    }
  }
}
