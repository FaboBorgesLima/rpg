import { ArmorItem } from '../armor-item';

export class IronArmor extends ArmorItem {
  override getProtection(): number {
    return 7;
  }

  constructor() {
    super('iron armor', 3500);
  }
}
