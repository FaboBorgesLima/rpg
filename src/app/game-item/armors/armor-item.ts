import { GameItem } from '../game-item';

export abstract class ArmorItem extends GameItem {
  constructor(name: string) {
    super(name, 'armor');
  }
  override getDamage(): number {
    return 0;
  }
  override getLifeRegen(): number {
    return 0;
  }
}
