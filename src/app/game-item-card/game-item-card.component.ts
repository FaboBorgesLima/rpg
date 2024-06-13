import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameItem } from '../game-item/game-item';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Player } from '../entity/player/player';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { GameItemFactoryService } from '../game-item-factory/game-item-factory.service';

@Component({
  selector: 'app-game-item-card',
  standalone: true,
  imports: [NgSwitchCase, NgSwitch, NgIf],
  templateUrl: './game-item-card.component.html',
  styleUrl: './game-item-card.component.css',
})
export class GameItemCardComponent {
  constructor(
    private playerStorage: PlayerStorageService,
    private gameItemFactory: GameItemFactoryService
  ) {}
  @Input({ required: true }) gameItem: GameItem =
    this.gameItemFactory.getDefault();

  @Input({ required: true }) player: Player =
    this.playerStorage.getDefaultPlayer(0);
  @Output() playerChange = new EventEmitter<Player>();

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

    console.log(this.player);

    this.playerStorage.update(this.player);
  }
}
