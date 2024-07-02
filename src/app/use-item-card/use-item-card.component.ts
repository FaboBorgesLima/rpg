import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../entity/player/player';
import { UsableItem } from '../game-item/usables/usable-item';
import { UsableItemDescriptionComponent } from '../usable-item-description/usable-item-description.component';
import { BattleStorageService } from '../battle-storage/battle-storage.service';
import { PlayerStorageService } from '../player-storage/player-storage.service';

@Component({
  selector: 'app-use-item-card',
  standalone: true,
  imports: [UsableItemDescriptionComponent],
  templateUrl: './use-item-card.component.html',
  styleUrl: './use-item-card.component.css',
})
export class UseItemCardComponent {
  @Input({ required: true }) player!: Player;
  @Output() playerChange = new EventEmitter<Player>();
  @Input({ required: true }) usable!: UsableItem;
  constructor(
    private battleStorage: BattleStorageService,
    private playerStorage: PlayerStorageService
  ) {}
  use() {
    this.player.useItem(this.usable);

    this.battleStorage.setPlayerWithStatus(this.player);
    this.playerStorage.update(this.player);
    this.playerChange.emit(this.player);
  }
}
