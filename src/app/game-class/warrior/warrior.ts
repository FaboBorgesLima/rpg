import { nFactorial } from '../../helpers/nfactorial';
import { GameClass, GameClassesNames } from '../game-class';

export class Warrior extends GameClass {
  protected name: GameClassesNames = 'warrior';
  constructor(xp: number) {
    super(xp);
  }
  override getMaxHealthPoints(): number {
    return nFactorial(this.level.getLevelAmount() / 2) * 5 + 16;
  }
  override getAttack(): number {
    return this.level.getLevelAmount() * 1 + 12;
  }
  override getDefense(): number {
    return nFactorial(this.level.getLevelAmount()) * 2 + 1;
  }
  override getSpeed(): number {
    return nFactorial(this.level.getLevelAmount()) * 0.5 + 8;
  }
}
