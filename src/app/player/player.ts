import { Entity } from '../entity/entity';
import { GameClassFactory } from '../game-class-factory/game-class-factory';
import { GameClass, GameClassesNames } from '../game-class/game-class';
import { GameItemFactory } from '../game-item-factory/game-item-factory';
import { GameItem } from '../game-item/game-item';

export class Player extends Entity {
  protected constructor(
    name: string,
    protected gameClass: GameClass,
    protected id: number,
    protected armor: GameItem,
    protected weapon: GameItem
  ) {
    super(name);
  }

  static getById(id: number): Player | void {
    const db = this.getDb();

    const player = db[id];

    if (!player) return;

    return new Player(
      player.name,
      GameClassFactory.factory(player.gameClass, player.xp),
      id,
      GameItemFactory.factory(player.armor),
      GameItemFactory.factory(player.weapon)
    );
  }

  static all(): { id: number; name: string; gameClass: GameClassesNames }[] {
    const db = this.getDb();

    const keys = Object.keys(db);

    const saves: { id: number; name: string; gameClass: GameClassesNames }[] =
      [];

    for (const key in keys) {
      const save = db[key];
      saves.push({
        gameClass: save.gameClass,
        id: Number(key),
        name: save.name,
      });
    }

    return saves;
  }

  static create(gameClass: GameClassesNames, name: string): Player {
    const db = this.getDb();

    const players = Object.entries(db);

    const [lastPlayerId] = players[players.length - 1];

    const newID = parseInt(lastPlayerId) + 1;

    const newClass = GameClassFactory.factory(gameClass, 0);

    db[newID] = {
      gameClass: gameClass,
      gameItems: [],
      xp: 0,
      name: name,
      armor: '',
      weapon: '',
    };

    this.writeDb(db);

    return new Player(
      name,
      newClass,
      newID,
      GameItemFactory.factory(''),
      GameItemFactory.factory('')
    );
  }

  override getGameClass(): GameClass {
    return this.gameClass;
  }

  private static getDb(): Db {
    const db = localStorage.getItem('player_rpg');
    if (!db) return {};

    return JSON.parse(db);
  }
  private static writeDb(db: Db): void {
    localStorage.setItem('player_rpg', JSON.stringify(db));
  }
}
interface Db {
  [k: number]: {
    gameClass: GameClassesNames;
    xp: number;
    name: string;
    gameItems: string[];
    armor: string;
    weapon: string;
  };
}
