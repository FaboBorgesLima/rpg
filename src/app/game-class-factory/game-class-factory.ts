import { GameClass, GameClassesNames } from '../game-class/game-class';
import { Warrior } from '../warrior/warrior';

export class GameClassFactory {
  static factory(name: GameClassesNames, xp: number): GameClass {
    return new Warrior(xp);
  }
}
