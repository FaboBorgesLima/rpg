import { effect } from '@angular/core';
import { Action, ActionType } from '../action/action';
import { Currency } from '../currency/currency';
import { Effect, getDefaultEffect, sumEffects } from '../effect/effect';
import { GameClass } from '../game-class/game-class';
import { GameItem } from '../game-item/game-item';
import { ArmorItem } from '../game-item/armors/armor-item';
import { WeaponItem } from '../game-item/weapons/weapon-item';

export abstract class Entity {
  private recivedEffects: Effect[] = [];

  constructor(
    protected name: string,
    private gameClass: GameClass,
    public armor: ArmorItem,
    public weapon: WeaponItem,
    private gold: Currency,
    public gameItems: GameItem[]
  ) {}

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
    return this.getRemainingLife() > 0;
  }

  private getSumOfRecivedEffects(): Effect {
    let effect: Effect = getDefaultEffect();
    for (const recived of this.recivedEffects) {
      effect = sumEffects(recived, effect);
    }
    return effect;
  }

  getRemainingLife(): number {
    return (
      this.gameClass.getMaxHealthPoints() +
      this.getSumOfRecivedEffects().deltaLife
    );
  }
  getRecivedEffects(): Effect[] {
    return this.recivedEffects;
  }

  applyEffect(effect: Effect): void {
    this.recivedEffects.push(effect);
  }

  getRemainingLifePercentage(): number {
    return (
      Math.max(this.getRemainingLife(), 0) / this.gameClass.getMaxHealthPoints()
    );
  }

  getTotalDamage(): number {
    return (
      this.getGameClass().getAttack() +
      this.weapon.getDamage() +
      this.getSumOfRecivedEffects().deltaStrength
    );
  }

  getTotalDefense(): number {
    return (
      this.gameClass.getDefense() +
      this.armor.getProtection() +
      this.getSumOfRecivedEffects().deltaDefense
    );
  }

  getStamina(): number {
    return (
      this.gameClass.getMaxStamina() +
      this.getSumOfRecivedEffects().deltaStamina
    );
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

  setRecivedEffects(recivedEffects: Effect[]): void {
    this.recivedEffects = recivedEffects;
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

  equipItem(gameItem: GameItem): void {
    const index = this.gameItems.findIndex(
      (item) => item.getName() == gameItem.getName()
    );

    if (index == -1) return;

    if (gameItem instanceof ArmorItem) {
      this.gameItems.splice(index, 1);
      this.armor = gameItem;
      return;
    }
    if (gameItem instanceof WeaponItem) {
      this.gameItems.splice(index, 1);
      this.weapon = gameItem;
      return;
    }
  }
}
