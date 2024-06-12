import { ArmorItem } from '../armor-item';

export class Clothes extends ArmorItem {
  override getProtection(): number {
    return 0;
  }

  constructor() {
    super('clothes');
  }
}
