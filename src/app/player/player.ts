import { Entity } from '../entity/entity';
import { GameClassFactoryService } from '../game-class-factory/game-class-factory.service';
import { GameClass, GameClassesNames } from '../game-class/game-class';
import { GameItemFactoryService } from '../game-item-factory/game-item-factory.service';
import { GameItem } from '../game-item/game-item';

export class Player extends Entity {
  constructor(
    name: string,
    protected gameClass: GameClass,
    protected id: number,
    public armor: GameItem,
    public weapon: GameItem,
    public gameItems: GameItem[]
  ) {
    super(name);
  }
  getId(): number {
    return this.id;
  }

  public getGameClass(): GameClass {
    return this.gameClass;
  }
}
