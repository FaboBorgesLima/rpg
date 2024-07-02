import { GameClass, GameClassesNames } from '../game-class';

export class MobClass extends GameClass {
  override getMaxStamina(): number {
    return this.maxStamina;
  }
  constructor(
    xp: number,
    name: GameClassesNames,
    private life: number,
    private attack: number,
    private defense: number,
    private speed: number,
    private maxStamina: number
  ) {
    super(xp);
    this.name = name;
  }
  protected override name: GameClassesNames;
  override getMaxHealthPoints(): number {
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
    return new MobClass(4040, 'mob', 200, 44, 4, 44, 200);
  }
  override getInventorySize(): number {
    return 0;
  }
}
