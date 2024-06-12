import { GameItem } from '../game-item';

export abstract class WeaponItem extends GameItem {
  constructor(name: string) {
    super(name, 'weapon');
  }

  override getLifeRegen(): number {
    return 0;
  }
  override getProtection(): number {
    return 0;
  }
}
