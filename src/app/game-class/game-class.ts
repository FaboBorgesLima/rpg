import { Level } from '../level/level';

export abstract class GameClass {
  protected abstract name: GameClassesNames;

  protected level: Level;

  private life: number;
  private remainingLife: number = 0;

  constructor(xp: number, life: number) {
    this.level = new Level(xp);
    this.life = life;
    this.remainingLife = life;
  }

  getLevel(): Level {
    return this.level;
  }

  isAlive(): boolean {
    return this.life > 0;
  }

  setLife(life: number): void {
    this.life = life;
    this.remainingLife = life;
  }

  getRemaingLife(): number {
    return this.remainingLife;
  }
  reciveAttack(attack: number): void {
    this.life -= attack;
  }
  getLife(): number {
    return this.life;
  }
  getName() {
    return this.name;
  }

  abstract getAttack(): number;

  abstract getDefense(): number;

  abstract getSpeed(): number;
}

export type GameClassesNames = 'thief' | 'warrior';
