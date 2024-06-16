import { Injectable } from '@angular/core';
import { Player } from '../entity/player/player';
import { GameItem } from '../game-item/game-item';

@Injectable({
  providedIn: 'root',
})
export class GameItemFilterService {
  constructor() {}

  doesPlayerHaveItem(player: Player, gameItem: GameItem): boolean {
    if (player.armor.getName() == gameItem.getName()) return true;

    if (player.weapon.getName() == gameItem.getName()) return true;

    for (const playerItem of player.gameItems) {
      if (playerItem.getName() == gameItem.getName()) return true;
    }

    return false;
  }

  removeAlreadyBuyed(gameItems: GameItem[], player: Player): GameItem[] {
    const filtered: GameItem[] = [];

    for (const gameItem of gameItems) {
      if (!this.doesPlayerHaveItem(player, gameItem)) filtered.push(gameItem);
    }

    return filtered;
  }
}
