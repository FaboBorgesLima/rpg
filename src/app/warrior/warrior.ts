import { GameClass, GameClassesNames } from '../game-class/game-class';

export class Warrior extends GameClass {
  protected name: GameClassesNames = 'warrior';
  constructor(xp: number, life: number) {
    super(xp, life);
  }
  override getLife(): number {
    return this.level.getLevelAmount() * 50 + 50;
  }
  override getAttack(): number {
    return this.level.getLevelAmount() * 5 + 20;
  }
  override getDefense(): number {
    return this.level.getLevelAmount() * 1 + 5;
  }
  override getSpeed(): number {
    return this.level.getLevelAmount() * 1 + 5;
  }
}
