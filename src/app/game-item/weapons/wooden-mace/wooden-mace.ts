import { WeaponItem } from '../weapon-item';

export class WoodenMace extends WeaponItem {
  constructor() {
    super('wooden-mace', 500);
  }
  override getDamage(): number {
    return 3;
  }
}
