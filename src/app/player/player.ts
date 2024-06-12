import { Entity } from '../entity/entity';
import { GameClass } from '../game-class/game-class';
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

  override getGameClass(): GameClass {
    return this.gameClass;
  }
}
