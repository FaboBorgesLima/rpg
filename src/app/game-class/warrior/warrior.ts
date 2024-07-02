import { nFactorial } from '../../helpers/nfactorial';
import { GameClass, GameClassesNames } from '../game-class';

export class Warrior extends GameClass {
  protected name: GameClassesNames = 'warrior';
  constructor(xp: number) {
    super(xp);
  }
  override getMaxHealthPoints(): number {
    return nFactorial(this.level.getLevelAmount() / 2) * 1 + 20;
  }
  override getAttack(): number {
    return this.level.getLevelAmount() * 1 + 5;
  }
  override getDefense(): number {
    return this.level.getLevelAmount();
  }
  override getSpeed(): number {
    return this.level.getLevelAmount() * 0.5 + 8;
  }
  override getMaxStamina(): number {
    return this.level.getLevelAmount() * 5 + 95;
  }
  override getInventorySize(): number {
    return this.level.getLevelAmount() + 5;
  }
}
