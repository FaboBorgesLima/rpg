import { GameClass, GameClassesNames } from '../game-class/game-class';

export class Warrior extends GameClass {
  protected name: GameClassesNames = 'warrior';
  constructor(xp: number) {
    super(xp, 100);
  }
  override getLife(): number {
    throw new Error('Method not implemented.');
  }
  override getAttack(): number {
    throw new Error('Method not implemented.');
  }
  override getDefense(): number {
    throw new Error('Method not implemented.');
  }
  override getSpeed(): number {
    throw new Error('Method not implemented.');
  }
}
