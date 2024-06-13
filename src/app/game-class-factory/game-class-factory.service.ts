import { Injectable } from '@angular/core';
import { GameClass } from '../game-class/game-class';
import { Warrior } from '../game-class/warrior/warrior';
import { Thief } from '../game-class/thief/thief';

@Injectable({
  providedIn: 'root',
})
export class GameClassFactoryService {
  factory(name: string, xp: number): GameClass {
    switch (name) {
      case 'thief':
        return new Thief(xp);

      case 'warrior':
        return new Warrior(xp);
    }
    return new Warrior(xp);
  }
}
