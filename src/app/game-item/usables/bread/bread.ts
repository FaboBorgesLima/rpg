import { UsableItem } from '../usable-item';

export class Bread extends UsableItem {
  constructor() {
    super('bread', 50);
  }
  override getLifeRegen(): number {
    return 15;
  }
}
