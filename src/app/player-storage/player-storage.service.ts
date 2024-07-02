import { Injectable } from '@angular/core';
import { Player } from '../entity/player/player';
import { GameClassFactoryService } from '../game-class-factory/game-class-factory.service';
import { GameClassesNames } from '../game-class/game-class';
import { GameItemFactoryService } from '../game-item-factory/game-item-factory.service';
import { GameItem } from '../game-item/game-item';
import { Currency } from '../currency/currency';
import { PeoplePlayingService } from '../people-playing/people-playing.service';
import { MobEntityFactoryService } from '../mob-entity-factory/mob-entity-factory.service';
import { Effect } from '../effect/effect';

@Injectable({
  providedIn: 'root',
})
export class PlayerStorageService {
  constructor(
    protected gameClassFactoryService: GameClassFactoryService,
    protected gameItemFactoryService: GameItemFactoryService,
    protected peoplePlayingService: PeoplePlayingService
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
      this.itemsNameToItems(player.gameItems),
      new Currency(player.gold),
      player.externalId ? player.externalId : Player.generateExternalId()
    );
  }

  private itemsNameToItems(itemsName: string[]): GameItem[] {
    const items: GameItem[] = [];

    for (const itemName of itemsName) {
      items.push(this.gameItemFactoryService.factory(itemName));
    }

    return items;
  }

  private getDb(): PlayerDb {
    const db = localStorage.getItem('player_rpg');
    if (!db) return {};

    return JSON.parse(db);
  }
  private writeDb(db: PlayerDb): void {
    localStorage.setItem('player_rpg', JSON.stringify(db));
  }
  create(gameClass: GameClassesNames, name: string): Player {
    const db = this.getDb();

    const newID = this.getDbLastId(db);

    const newClass = this.gameClassFactoryService.factory(gameClass, 0);

    db[newID] = {
      gameClass: gameClass,
      gameItems: [],
      xp: 0,
      name: name,
      armor: 'clothes',
      weapon: 'fists',
      gold: 0,
      externalId: Player.generateExternalId(),
    };

    this.writeDb(db);

    this.peoplePlayingService.syncPlayerSaves(db).then().catch();

    return new Player(
      name,
      newClass,
      newID,
      this.gameItemFactoryService.factory(db[newID].armor),
      this.gameItemFactoryService.factory(db[newID].weapon),
      [],
      new Currency(),
      db[newID].externalId
    );
  }
  private getDbLastId(db: PlayerDb): number {
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
      gold: player.getGold().getAmount(),
      externalId: player.getExternalId(),
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
      [],
      new Currency(0),
      Player.generateExternalId()
    );
  }

  loadPlayer(id: number, recivedEffects: Effect[]): void | Player {
    const player = this.getById(id);

    if (!player) return;

    player.setRecivedEffects(recivedEffects);

    return player;
  }

  async syncWithPantry(): Promise<boolean> {
    const db = this.getDb();

    return this.peoplePlayingService.syncPlayerSaves(db);
  }
}
export interface PlayerDb {
  [k: number]: {
    gameClass: GameClassesNames;
    xp: number;
    name: string;
    gameItems: string[];
    armor: string;
    weapon: string;
    gold: number;
    externalId: string;
  };
}
