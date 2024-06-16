import { Currency } from '../../currency/currency';
import { GameClass } from '../../game-class/game-class';
import { MobClass } from '../../game-class/mob-class/mob-class';
import { Clothes } from '../../game-item/armors/clothes/clothes';
import { Fists } from '../../game-item/weapons/fists/fists';
import { Entity, EntityAction } from '../entity';

export class MobEntity extends Entity {
  override action: EntityAction = 'attack';

  constructor(mobClass: GameClass, name: string, public image: string) {
    super(
      name,
      mobClass,
      new Clothes(),
      new Fists(),
      new Currency(mobClass.getLevel().getXp() / 2)
    );
  }

  static getDefault(): MobEntity {
    return new MobEntity(MobClass.getDefault(), '404', '');
  }

  getRandomAction(): EntityAction {
    const between0and2 = MobEntity.getRandomIntBetween(0, 3);

    switch (between0and2) {
      case 0:
        return 'attack';
      case 1:
        return 'defense';
      case 2:
        return 'run';
    }
    return 'attack';
  }
  /**
   *
   * @param oponent
   * @returns a action based in env vars of the mob
   */
  getThoughtAction(oponent: Entity): EntityAction {
    if (this.getStaminaPercentage() < 1.5 * Math.random()) {
      return 'defense';
    }

    const sumLife = oponent.getRemainingLife() + this.getRemainingLife();

    const proportinalLife = this.getRemainingLife() / sumLife;

    if (proportinalLife < 0.25 * Math.random()) {
      return 'run';
    }

    return 'attack';
  }

  /**
   * will set action to random action
   */
  setThoughtAction(oponent: Entity): void {
    this.action = this.getThoughtAction(oponent);
  }

  /**
   * will set action to random action
   */
  setRandomAction(): void {
    this.action = this.getRandomAction();
  }
  /**
   *
   * @param min example 0
   * @param max example 3
   * @returns exit is 0 or 1 or 2
   */
  private static getRandomIntBetween(min: number, max: number): number {
    return Math.trunc((max - min) * Math.random());
  }
}
