import { GameClass, GameClassesNames } from '../game-class';

export class MobClass extends GameClass {
  constructor(
    xp: number,
    name: GameClassesNames,
    private life: number,
    private attack: number,
    private defense: number,
    private speed: number
  ) {
    super(xp);
    this.name = name;
  }
  protected override name: GameClassesNames;
  override getLife(): number {
    return this.life;
  }
  override getAttack(): number {
    return this.attack;
  }
  override getDefense(): number {
    return this.defense;
  }
  override getSpeed(): number {
    return this.speed;
  }

  static getDefault(): MobClass {
    return new MobClass(404, 'mob', 404, 44, 4, 44);
  }
}
