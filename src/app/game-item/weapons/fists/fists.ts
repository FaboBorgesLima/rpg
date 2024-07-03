import { WeaponItem } from '../weapon-item';

export class Fists extends WeaponItem {
  public getDamage(): number {
    return 1;
  }
  public constructor() {
    super('fists', 0);
  }
}
