import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '../entity/player/player';
import { GameItem } from '../game-item/game-item';
import { NgIf } from '@angular/common';
import { GameItemFactoryService } from '../game-item-factory/game-item-factory.service';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { UsableItemDescriptionComponent } from '../usable-item-description/usable-item-description.component';
import { UsableItem } from '../game-item/usables/usable-item';

@Component({
  selector: 'app-shop-item-card',
  standalone: true,
  imports: [NgIf, UsableItemDescriptionComponent],
  templateUrl: './shop-item-card.component.html',
  styleUrl: './shop-item-card.component.css',
})
export class ShopItemCardComponent implements OnInit {
  @Input({ required: true }) player!: Player;
  @Output() playerChange = new EventEmitter<Player>();

  @Input({ required: true }) item!: GameItem;
  constructor(
    private gameItemFactory: GameItemFactoryService,
    private playerStorage: PlayerStorageService
  ) {}
  isUsable: UsableItem | undefined;
  ngOnInit(): void {
    if (this.item instanceof UsableItem) this.isUsable = this.item;
  }

  onBuy(): void {
    this.player.buyItem(this.gameItemFactory.factory(this.item.getName()));
    this.playerStorage.update(this.player);
  }
}
