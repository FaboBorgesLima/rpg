import { Entity, EntityAction } from '../entity';
import { GameClass } from '../../game-class/game-class';
import { GameItem } from '../../game-item/game-item';

export class Player extends Entity {
  public action: EntityAction = 'defense';
  constructor(
    name: string,
    protected playerClass: GameClass,
    protected id: number,
    armor: GameItem,
    weapon: GameItem,
    public gameItems: GameItem[]
  ) {
    super(name, playerClass, armor, weapon);
  }
  getId(): number {
    return this.id;
  }
}
