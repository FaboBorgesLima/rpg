import { Injectable } from '@angular/core';
import { GameItem } from '../game-item/game-item';
import { Sword } from '../sword/sword';

@Injectable({
  providedIn: 'root',
})
export class GameItemFactoryService {
  factory(name: string): GameItem {
    return new Sword();
  }
  static factory = new GameItemFactoryService().factory;
}
