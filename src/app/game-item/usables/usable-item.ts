import { GameItem } from '../game-item';

export abstract class UsableItem extends GameItem {
  constructor(name: string) {
    super(name, 'usable');
  }
  override getDamage(): number {
    return 0;
  }
  override getProtection(): number {
    return 0;
  }
}
