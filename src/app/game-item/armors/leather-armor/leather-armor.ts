import { ArmorItem } from '../armor-item';

export class LeatherArmor extends ArmorItem {
  override getProtection(): number {
    return 3;
  }

  constructor() {
    super('leather armor', 500);
  }
}
