import { GameClass } from '../game-class/game-class';

export abstract class Entity {
  constructor(
    protected name: string
  ) {}

  getName(): string {
    return this.name;
  }
  abstract getGameClass(): GameClass;
}
