import { Injectable } from '@angular/core';
import { Player } from '../player/player';
import { GameClassFactoryService } from '../game-class-factory/game-class-factory.service';
import { GameClassesNames } from '../game-class/game-class';
import { GameItemFactoryService } from '../game-item-factory/game-item-factory.service';
import { GameItem } from '../game-item/game-item';

@Injectable({
  providedIn: 'root',
})
export class PlayerStorageService {
  constructor(
    protected gameClassFactoryService: GameClassFactoryService,
    protected gameItemFactoryService: GameItemFactoryService
  ) {}

  getById(id: number): Player | void {
    const db = this.getDb();

    const player = db[id];

    if (!player) return;

    return new Player(
      player.name,
      this.gameClassFactoryService.factory(player.gameClass, player.xp),
      id,
      this.gameItemFactoryService.factory(player.armor),
      this.gameItemFactoryService.factory(player.weapon),
      this.itemsNameToItems(player.gameItems)
    );
  }

  private itemsNameToItems(itemsName: string[]): GameItem[] {
    const items: GameItem[] = [];

    for (const itemName of itemsName) {
      items.push(this.gameItemFactoryService.factory(itemName));
    }

    return items;
  }

  private getDb(): Db {
    const db = localStorage.getItem('player_rpg');
    if (!db) return {};

    return JSON.parse(db);
  }
  private writeDb(db: Db): void {
    localStorage.setItem('player_rpg', JSON.stringify(db));
  }
  create(gameClass: GameClassesNames, name: string): Player {
    const db = this.getDb();

    const newID = this.getDbLastId(db);

    const newClass = this.gameClassFactoryService.factory(gameClass, 0);

    db[newID] = {
      gameClass: gameClass,
      gameItems: ['sword'],
      xp: 0,
      name: name,
      armor: 'clothes',
      weapon: 'fists',
    };

    this.writeDb(db);

    return new Player(
      name,
      newClass,
      newID,
      this.gameItemFactoryService.factory(db[newID].armor),
      this.gameItemFactoryService.factory(db[newID].weapon),
      []
    );
  }
  private getDbLastId(db: Db): number {
    const players = Object.entries(db);

    if (players.length == 0) return 1;

    const [lastPlayerId] = players[players.length - 1];

    const newID = parseInt(lastPlayerId) + 1;

    return newID;
  }
  all(): { id: number; name: string; gameClass: GameClassesNames }[] {
    const db = this.getDb();

    const keys = Object.keys(db);

    const saves: { id: number; name: string; gameClass: GameClassesNames }[] =
      [];

    for (const key of keys) {
      const save = db[Number(key)];

      saves.push({
        gameClass: save.gameClass,
        id: Number(key),
        name: save.name,
      });
    }

    return saves;
  }
  update(player: Player): Player {
    const db = this.getDb();

    db[player.getId()] = {
      armor: player.armor.getName(),
      weapon: player.weapon.getName(),
      gameClass: player.getGameClass().getName(),
      gameItems: player.gameItems.map((item) => item.getName()),
      name: player.getName(),
      xp: player.getGameClass().getLevel().getXp(),
    };

    this.writeDb(db);

    return player;
  }

  getDefaultPlayer(id: number): Player {
    return new Player(
      '',
      this.gameClassFactoryService.factory('warrior', 0),
      id,
      this.gameItemFactoryService.factory('fists'),
      this.gameItemFactoryService.factory('fists'),
      []
    );
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
