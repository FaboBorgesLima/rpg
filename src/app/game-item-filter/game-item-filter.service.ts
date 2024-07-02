import { Injectable } from '@angular/core';
import { Player } from '../entity/player/player';
import { GameItem, GameItem as T } from '../game-item/game-item';
import { UsableItem } from '../game-item/usables/usable-item';

@Injectable({
  providedIn: 'root',
})
export class GameItemFilterService {
  constructor() {}

  doesPlayerHaveItem<T extends GameItem>(player: Player, gameItem: T): boolean {
    if (player.armor.getName() == gameItem.getName()) return true;

    if (player.weapon.getName() == gameItem.getName()) return true;

    for (const playerItem of player.gameItems) {
      if (playerItem.getName() == gameItem.getName()) return true;
    }

    return false;
  }

  removeAlreadyBuyed<T extends GameItem>(gameItems: T[], player: Player): T[] {
    const filtered: T[] = [];

    for (const gameItem of gameItems) {
      if (!this.doesPlayerHaveItem(player, gameItem)) filtered.push(gameItem);
    }

    return filtered;
  }

  getOnlyUsables<T extends GameItem>(gameItems: T[]): UsableItem[] {
    const usables: UsableItem[] = [];
    for (const item of gameItems) {
      if (item instanceof UsableItem) usables.push(item);
    }
    return usables;
  }
}
