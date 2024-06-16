import { Injectable } from '@angular/core';
import { GameItem } from '../game-item/game-item';
import { Sword } from '../game-item/weapons/sword/sword';
import { Clothes } from '../game-item/armors/clothes/clothes';
import { Fists } from '../game-item/weapons/fists/fists';
import { Bread } from '../game-item/usables/bread/bread';

@Injectable({
  providedIn: 'root',
})
export class GameItemFactoryService {
  factory(name: string): GameItem {
    switch (name) {
      case 'clothes':
        return new Clothes();
      case 'fists':
        return new Fists();
      case 'sword':
        return new Sword();
      case 'bread':
        return new Bread();
    }
    return new Clothes();
  }

  getDefault(): GameItem {
    return new Clothes();
  }

  getUsables(): GameItem[] {
    return [new Bread()];
  }

  getArmors(): GameItem[] {
    return [new Clothes()];
  }

  getWeapons(): GameItem[] {
    return [new Fists(), new Sword()];
  }
}
