import { Action, ActionType } from '../action/action';
import { Currency } from '../currency/currency';
import { Effect } from '../effect/effect';
import { GameClass } from '../game-class/game-class';
import { GameItem } from '../game-item/game-item';

export abstract class Entity {
  private remainingLife: number = 0;

  private stamina: number = 0;

  constructor(
    protected name: string,
    private gameClass: GameClass,
    public armor: GameItem,
    public weapon: GameItem,
    private gold: Currency
  ) {
    this.remainingLife = this.gameClass.getMaxHealthPoints();

    this.stamina = this.gameClass.getMaxStamina();
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

  reciveEffect(effect: Effect): void {
    this.setRemainingLife(this.getRemainingLife() + effect.deltaLife);

    this.setStamina(this.getStamina() + effect.deltaStamina);
  }

  resetRemainingLife(): void {
    this.remainingLife = this.getGameClass().getMaxHealthPoints();
  }

  setStamina(stamina: number): void {
    this.stamina = Math.min(
      this.gameClass.getMaxStamina(),
      Math.max(stamina, 0)
    );
  }

  setRemainingLife(remainingLife: number): void {
    this.remainingLife = Math.min(
      this.getGameClass().getMaxHealthPoints(),
      Math.max(remainingLife, 0)
    );
  }

  getRemainingLifePercentage(): number {
    return (
      Math.max(this.remainingLife, 0) / this.gameClass.getMaxHealthPoints()
    );
  }

  getTotalDamage(): number {
    return this.getGameClass().getAttack() + this.weapon.getDamage();
  }

  getTotalDefense(): number {
    return this.gameClass.getDefense() + this.armor.getProtection();
  }

  getStamina(): number {
    return this.stamina;
  }
  getStaminaPercentage(): number {
    return this.getStamina() / this.gameClass.getMaxStamina();
  }

  /**
   *
   * @returns says if a entity will strike
   */
  willStrike(): boolean {
    return this.getStrikeChance() > Math.random();
  }
  /**
   *
   * @returns a number between 1 (will run away) and 0 (will not run away)
   */
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

  getAction(actionType: ActionType): Action {
    return new Action(this, actionType);
  }

  /**
   *
   * @returns a number between 1 and 0
   */
  getStrikeChance(): number {
    return this.getStaminaPercentage();
  }

  /**
   *
   * @returns gets the base percentage of damage recived, is a number between 0 and 1
   */
  getDamageSusceptibility(): number {
    return Math.max((100 - this.getTotalDefense()) / 100, 0.5);
  }
}
