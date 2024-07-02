import { GameItem } from '../game-item';

export abstract class ArmorItem extends GameItem {
  constructor(name: string, price: number) {
    super(name, 'armor', price);
  }
  override getDamage(): number {
    return 0;
  }
}
