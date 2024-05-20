import { GameItem } from '../game-item/game-item';
import { Sword } from '../sword/sword';

export class GameItemFactory {
  static factory(name: string): GameItem {
    return new Sword();
  }
}
