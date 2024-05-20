import { GameItem } from '../game-item/game-item';

export class Sword extends GameItem {
  protected override itemType: 'usable' | 'weapon' | 'armor' = 'weapon';
  constructor() {
    super('sword');
  }
}
