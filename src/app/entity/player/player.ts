import { Entity, EntityAction } from '../entity';
import { GameClass } from '../../game-class/game-class';
import { GameItem } from '../../game-item/game-item';
import { Currency } from '../../currency/currency';
import { GameItemFactoryService } from '../../game-item-factory/game-item-factory.service';

export class Player extends Entity {
  public action: EntityAction = 'defense';
  constructor(
    name: string,
    protected playerClass: GameClass,
    protected id: number,
    armor: GameItem,
    weapon: GameItem,
    public gameItems: GameItem[],
    gold: Currency
  ) {
    super(name, playerClass, armor, weapon, gold);
  }
  getId(): number {
    return this.id;
  }
}
