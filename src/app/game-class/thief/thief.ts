import { nFactorial } from '../../helpers/nfactorial';
import { GameClass, GameClassesNames } from '../game-class';

export class Thief extends GameClass {
  protected name: GameClassesNames = 'thief';
  constructor(xp: number) {
    super(xp);
  }
  override getMaxHealthPoints(): number {
    return nFactorial(this.level.getLevelAmount() / 2) * 2 + 16;
  }
  override getAttack(): number {
    return this.level.getLevelAmount() * 0.5 + 12;
  }
  override getDefense(): number {
    return this.level.getLevelAmount() * 1 + 2;
  }
  override getSpeed(): number {
    return this.level.getLevelAmount() * 1 + 10;
  }
  override getMaxStamina(): number {
    return this.level.getLevelAmount() * 5 + 95;
  }
}
