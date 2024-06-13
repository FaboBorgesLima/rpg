import { nFactorial } from '../../helpers/nfactorial';
import { GameClass, GameClassesNames } from '../game-class';

export class Thief extends GameClass {
  protected name: GameClassesNames = 'thief';
  constructor(xp: number) {
    super(xp);
  }
  override getMaxHealthPoints(): number {
    return nFactorial(this.level.getLevelAmount() / 2) * 3 + 20;
  }
  override getAttack(): number {
    return this.level.getLevelAmount() * 0.5 + 16;
  }
  override getDefense(): number {
    return nFactorial(this.level.getLevelAmount()) * 1 + 2;
  }
  override getSpeed(): number {
    return nFactorial(this.level.getLevelAmount()) * 1 + 10;
  }
}
