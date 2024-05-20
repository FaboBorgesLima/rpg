export abstract class GameItem {
  protected abstract itemType: ItemType;
  protected constructor(protected name: string) {}
  getName(): string {
    return this.name;
  }
  getItemType(): ItemType {
    return this.itemType;
  }
}
type ItemType = 'usable' | 'weapon' | 'armor';
