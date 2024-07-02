import { Entity } from '../entity';
import { GameClass } from '../../game-class/game-class';
import { GameItem } from '../../game-item/game-item';
import { Currency } from '../../currency/currency';
import { ActionType } from '../../action/action';
import { UsableItem } from '../../game-item/usables/usable-item';

export class Player extends Entity {
  public nextActionType: ActionType = 'attack';
  constructor(
    name: string,
    protected playerClass: GameClass,
    protected id: number,
    armor: GameItem,
    weapon: GameItem,
    gameItems: GameItem[],
    gold: Currency,
    private externalId: string
  ) {
    super(name, playerClass, armor, weapon, gold, gameItems);
  }
  getExternalId(): string {
    return this.externalId ? this.externalId : Player.generateExternalId();
  }
  static generateExternalId(): string {
    return Math.trunc(Math.random() * 1_000_000).toString() + 'a';
  }
  getId(): number {
    return this.id;
  }
  useItem(usable: UsableItem): void {
    const index = this.gameItems.findIndex(
      (item) => item.getName() == usable.getName()
    );

    if (index == -1) return;

    this.gameItems.splice(index, 1);

    this.applyEffect(usable.getEffects());
  }
  canUseItem(usable: UsableItem): boolean {
    const totalLifeAfterUse =
      usable.getEffects().deltaLife + this.getRemainingLife();
    const totalStaminaAfterUse =
      usable.getEffects().deltaStamina + this.getStamina();

    return (
      totalLifeAfterUse <= this.getGameClass().getMaxHealthPoints() &&
      totalStaminaAfterUse <= this.getGameClass().getMaxStamina()
    );
  }
  buyItem(item: GameItem): boolean {
    if (!this.canBuyItem(item)) return false;

    this.getGold().minus(item.getPrice());

    this.gameItems.push(item);

    return true;
  }

  canBuyItem(item: GameItem): boolean {
    return (
      this.getGold().canBuy(item.getPrice()) &&
      this.getGameClass().getInventorySize() >= this.gameItems.length
    );
  }

  /**
   *
   * @param item
   * @returns nothing (if the item does not exist) or the value added to the gold of the player
   */
  sellItem(item: GameItem): void | number {
    const index = this.gameItems.findIndex(
      (toSell) => toSell.getName() == item.getName()
    );

    if (index == -1) return;

    this.gameItems.splice(index, 1);

    this.getGold().setAmount(this.getGold().getAmount() + item.getSalePrice());
  }
}
