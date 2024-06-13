import { Entity } from '../entity/entity';

export class Mob extends Entity {
  constructor(
    name: string,
    public xp: number, // Xp given on death
    public attack: number,
    public defense: number,
    public hp: number,
    public image: string,
    public url: string
  ) {
    super(name);
  }

  public getXp(): number {
    return this.xp;
  }
  // public damageOpponent(): number {
  //     return this.numberBetween()
  // }

  static getDefault(): Mob {
    return new Mob('404', 100, 10, 10, 404, '', '');
  }

  /**
   *
   * @param n the number
   * @param min minimum value
   * @param max maximum value
   * @returns a number between min and max
   */
  private numberBetween(n: number, min: number, max: number) {
    return Math.max(Math.min(n, max), min);
  }
}
