import { Entity } from '../entity';
import { GameClass } from '../../game-class/game-class';
import { GameItem } from '../../game-item/game-item';
import { Currency } from '../../currency/currency';
import { ActionType } from '../../action/action';

export class Player extends Entity {
  public nextActionType: ActionType = 'attack';
  constructor(
    name: string,
    protected playerClass: GameClass,
    protected id: number,
    armor: GameItem,
    weapon: GameItem,
    public gameItems: GameItem[],
    gold: Currency,
    private externalId: string
  ) {
    super(name, playerClass, armor, weapon, gold);
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
}
