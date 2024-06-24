import { Currency } from '../currency/currency';
import { GameClass } from '../game-class/game-class';
import { GameItem } from '../game-item/game-item';

export abstract class Entity {
  private remainingLife: number = 0;

  abstract action: EntityAction;

  private stamina: number = 0;

  constructor(
    protected name: string,
    private gameClass: GameClass,
    public armor: GameItem,
    public weapon: GameItem,
    private gold: Currency
  ) {
    this.remainingLife = this.gameClass.getMaxHealthPoints();

    this.stamina = 100;
  }

  getGold(): Currency {
    return this.gold;
  }

  getName(): string {
    return this.name;
  }

  getGameClass(): GameClass {
    return this.gameClass;
  }

  isAlive(): boolean {
    return this.remainingLife > 0;
  }

  getRemainingLife(): number {
    return this.remainingLife;
  }

  setMaxLife(): void {
    this.remainingLife = this.getGameClass().getMaxHealthPoints();
  }

  setStamina(stamina: number): void {
    this.stamina = Math.min(100, Math.max(stamina, 0));
  }

  getRemainingLifePercentage(): number {
    return (
      Math.max(this.remainingLife, 0) / this.gameClass.getMaxHealthPoints()
    );
  }

  reciveAction(from: Entity) {
    switch (from.action) {
      case 'defense':
        break;
      case 'attack':
        if (!from.willStrike()) break;

        if (this.action == 'defense') {
          this.remainingLife -=
            (this.getDamageSusceptibility() / 2) * from.getTotalDamage();
          break;
        }

        if (this.action == 'run') {
          this.remainingLife -=
            this.getDamageSusceptibility() * 2 * from.getTotalDamage();
          break;
        }

        this.remainingLife -=
          this.getDamageSusceptibility() * from.getTotalDamage();
        break;
      case 'run':
    }

    switch (this.action) {
      case 'defense':
        this.setStamina(this.stamina + 15);
        break;
      case 'attack':
        this.setStamina(this.stamina - 10);
        break;
      case 'run':
        this.setStamina(this.stamina - 20);
        break;
    }
  }

  getTotalDamage(): number {
    return this.getGameClass().getAttack() + this.weapon.getDamage();
  }
  getStamina(): number {
    return this.stamina;
  }

  /**
   *
   * @returns says if a entity will strike
   */
  protected willStrike(): boolean {
    return this.getStrikeChance() > Math.random();
  }

  getStaminaPercentage(): number {
    return this.getStamina() / 100;
  }

  getStrikeChance(): number {
    return this.getStaminaPercentage();
  }

  getTotalDefense(): number {
    return this.gameClass.getDefense() + this.armor.getProtection();
  }

  getRunAwayChance(from: Entity): number {
    const speedSum =
      from.getGameClass().getSpeed() + this.getGameClass().getSpeed();
    const sumStamina = from.getStamina() + this.getStamina();

    const sumRemainingLife = from.getRemainingLife() + this.getRemainingLife();

    const proportionalSpeed = this.getGameClass().getSpeed() / speedSum;

    const proportinalStamina = this.getStamina() / sumStamina;

    const proportionalRemainingLife = Math.min(
      (this.getRemainingLife() / sumRemainingLife) * 2,
      1
    );

    return (
      (proportinalStamina + proportionalSpeed + proportionalRemainingLife) / 3
    );
  }

  /**
   *
   * @returns gets the base percentage of damage recived, is a number between 0 and 1
   */
  protected getDamageSusceptibility(): number {
    return Math.max((100 - this.getTotalDefense()) / 100, 0.5);
  }
}
export type EntityAction = 'defense' | 'attack' | 'run';
