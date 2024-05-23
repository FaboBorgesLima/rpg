import { Injectable } from '@angular/core';
import { GameClass, GameClassesNames } from '../game-class/game-class';
import { Warrior } from '../warrior/warrior';
import { Thief } from '../thief/thief';

@Injectable({
  providedIn: 'root',
})
export class GameClassFactoryService {
  factory(name: GameClassesNames, xp: number): GameClass {
    switch (name) {
      case 'thief':
        return new Thief(xp);

      case 'warrior':
        return new Warrior(xp);
    }
    return new Warrior(xp);
  }
  static factory = new GameClassFactoryService().factory;
}
