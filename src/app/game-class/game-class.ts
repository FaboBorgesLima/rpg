import { Level } from '../level/level';

export abstract class GameClass {
  protected abstract name: GameClassesNames;

  protected level: Level;

  constructor(xp: number) {
    this.level = new Level(xp);
  }

  getLevel(): Level {
    return this.level;
  }

  getName() {
    return this.name;
  }

  abstract getMaxHealthPoints(): number;

  abstract getAttack(): number;

  abstract getDefense(): number;

  abstract getSpeed(): number;

  abstract getMaxStamina(): number;
}

export type GameClassesNames = 'thief' | 'warrior' | 'mob';
