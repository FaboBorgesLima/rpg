import { GameClass, GameClassesNames } from '../game-class/game-class';

export class Thief extends GameClass {
  protected override name: GameClassesNames = 'thief';
  constructor(xp: number, life: number) {
    super(xp, life);
  }
  override getAttack(): number {
    return this.level.getLevelAmount() * 2 + 15;
  }
  override getLife(): number {
    return this.level.getLevelAmount() * 25 + 50;
  }
  override getDefense(): number {
    return this.level.getLevelAmount() * 1 + 2;
  }
  override getSpeed(): number {
    return this.level.getLevelAmount() * 2 + 10;
  }
}
