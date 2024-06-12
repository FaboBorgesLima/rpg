import { Injectable } from '@angular/core';
import { GameClass, GameClassesNames } from '../game-class/game-class';
import { Warrior } from '../warrior/warrior';
import { Thief } from '../thief/thief';

@Injectable({
  providedIn: 'root',
})
export class GameClassFactoryService {
  factory(name: GameClassesNames, xp: number, life: number): GameClass {
    switch (name) {
      case 'thief':
        return new Thief(xp, life);

      case 'warrior':
        return new Warrior(xp, life);
    }
    return new Warrior(xp, life);
  }
}
