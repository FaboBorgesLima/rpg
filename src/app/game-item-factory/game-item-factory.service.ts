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
      case new Clothes().getName():
        return new Clothes();
      case new Fists().getName():
        return new Fists();
      case new Sword().getName():
        return new Sword();
    }
    return new Clothes();
  }

  getDefault(): GameItem {
    return new Clothes();
  }
}
