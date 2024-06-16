import { GameItem } from '../../game-item';
import { WeaponItem } from '../weapon-item';

export class Sword extends WeaponItem {
  override getDamage(): number {
    return 5;
  }

  constructor() {
    super('sword', 200);
  }
}
