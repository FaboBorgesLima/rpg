import { Level } from '../level/level';

export abstract class GameClass {
  protected abstract name: GameClassesNames;

  protected level: Level;

  private remainingLife: number = 0;

  constructor(xp: number) {
    this.level = new Level(xp);
    this.remainingLife = this.getLife();
  }

  getLevel(): Level {
    return this.level;
  }

  isAlive(): boolean {
    return this.remainingLife > 0;
  }

  getRemaingLife(): number {
    return this.remainingLife;
  }

  receiveAttack(attack: number): void {
    this.remainingLife -= attack;
  }

  abstract getLife(): number;

  getName() {
    return this.name;
  }

  abstract getAttack(): number;

  abstract getDefense(): number;

  abstract getSpeed(): number;
}

export type GameClassesNames = 'thief' | 'warrior' | 'mob';
