export abstract class GameItem {
  protected constructor(
    protected name: string,
    private itemType: ItemType,
    private price: number
  ) {}
  getName(): string {
    return this.name;
  }
  getItemType(): ItemType {
    return this.itemType;
  }
  getPrice(): number {
    return this.price;
  }
  abstract getProtection(): number;
  abstract getDamage(): number;
  abstract getLifeRegen(): number;
}
export type ItemType = 'usable' | 'weapon' | 'armor';
