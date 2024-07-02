import { GameItem } from '../game-item';

export abstract class WeaponItem extends GameItem {
  constructor(name: string, price: number) {
    super(name, 'weapon', price);
  }

  override getProtection(): number {
    return 0;
  }
}
