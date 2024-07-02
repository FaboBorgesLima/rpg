import { Effect } from '../../effect/effect';
import { GameItem } from '../game-item';

export abstract class UsableItem extends GameItem {
  constructor(name: string, price: number) {
    super(name, 'usable', price);
  }
  override getDamage(): number {
    return 0;
  }
  override getProtection(): number {
    return 0;
  }

  abstract getEffects(): Effect;
}
