import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameItem } from '../game-item/game-item';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Player } from '../entity/player/player';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { GameItemFactoryService } from '../game-item-factory/game-item-factory.service';
import { UsableItem } from '../game-item/usables/usable-item';
import { UsableItemDescriptionComponent } from '../usable-item-description/usable-item-description.component';

@Component({
  selector: 'app-game-item-card',
  standalone: true,
  imports: [NgSwitchCase, NgSwitch, NgIf, UsableItemDescriptionComponent],
  templateUrl: './game-item-card.component.html',
  styleUrl: './game-item-card.component.css',
})
export class GameItemCardComponent implements OnInit {
  constructor(
    private playerStorage: PlayerStorageService,
    private gameItemFactory: GameItemFactoryService
  ) {}
  ngOnInit(): void {
    if (this.gameItem instanceof UsableItem) this.ifIsUsable = this.gameItem;
  }
  @Input({ required: true }) gameItem: GameItem =
    this.gameItemFactory.getDefault();

  @Input({ required: true }) player: Player =
    this.playerStorage.getDefaultPlayer(0);
  @Output() playerChange = new EventEmitter<Player>();

  ifIsUsable?: UsableItem;

  onEquip() {
    if (this.gameItem.getItemType() == 'armor') {
      this.player.gameItems.push(this.player.armor);
      this.player.gameItems.splice(
        this.player.gameItems.indexOf(this.gameItem),
        1
      );
      this.player.armor = this.gameItem;
    } else {
      this.player.gameItems.push(this.player.weapon);
      this.player.gameItems.splice(
        this.player.gameItems.indexOf(this.gameItem),
        1
      );
      this.player.weapon = this.gameItem;
    }
    this.playerChange.emit(this.player);

    this.playerStorage.update(this.player);
  }
  onSell() {
    this.player.sellItem(this.gameItem);
    this.playerChange.emit(this.player);
    this.playerStorage.update(this.player);
  }
}
