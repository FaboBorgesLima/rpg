import { GameItem } from '../../game-item';
import { WeaponItem } from '../weapon-item';

export class IronMace extends WeaponItem {
  override getDamage(): number {
    return 7;
  }

  constructor() {
    super('iron-mace', 4500);
  }
}
