export abstract class GameItem {
  private randomHash: string = '';
  protected constructor(protected name: string, private itemType: ItemType) {}
  getName(): string {
    return this.name;
  }
  getItemType(): ItemType {
    return this.itemType;
  }
  abstract getProtection(): number;
  abstract getDamage(): number;
  abstract getLifeRegen(): number;
}
export type ItemType = 'usable' | 'weapon' | 'armor';
