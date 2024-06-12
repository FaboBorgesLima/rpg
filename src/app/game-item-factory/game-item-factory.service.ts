import { Injectable } from '@angular/core';
import { GameItem } from '../game-item/game-item';
import { Sword } from '../game-item/weapons/sword/sword';
import { Clothes } from '../game-item/armors/clothes/clothes';
import { Fists } from '../game-item/weapons/fists/fists';

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
    }
    return new Clothes();
  }
}
