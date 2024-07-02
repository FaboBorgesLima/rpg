import { Injectable } from '@angular/core';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { MobEntityFactoryService } from '../mob-entity-factory/mob-entity-factory.service';
import { Player } from '../entity/player/player';
import { MobEntity } from '../entity/mob-entity/mob-entity';
import { Observable } from 'rxjs';
import { Effect } from '../effect/effect';

@Injectable({
  providedIn: 'root',
})
export class BattleStorageService {
  private readonly itemInLocalStorage = 'rpg-player-battle';

  constructor(
    private playerStorage: PlayerStorageService,
    private mobEntityFactory: MobEntityFactoryService
  ) {}

  private getDb(): BattleDb {
    const item = localStorage.getItem(this.itemInLocalStorage);

    if (!item) return {};

    return JSON.parse(item);
  }

  private writeDb(db: BattleDb): void {
    localStorage.setItem(this.itemInLocalStorage, JSON.stringify(db));
  }

  saveBattle(player: Player, mobEntity: MobEntity) {
    const db = this.getDb();

    db[player.getId()] = {
      player: {
        recivedEffects: player.getRecivedEffects(),
      },
      mob: {
        index: mobEntity.index,
        recivedEffects: mobEntity.getRecivedEffects(),
      },
    };

    this.writeDb(db);
  }
  endBattle(playerId: number) {
    const db = this.getDb();

    db[playerId] = undefined;

    this.writeDb(db);
  }

  private getBattleByPlayerId(id: number): void | BattleSchema {
    const db = this.getDb();

    const battle = db[id];

    return battle;
  }

  loadBattle(playerId: number): void | Observable<[Player, MobEntity]> {
    const battle = this.getBattleByPlayerId(playerId);

    if (!battle) return;

    const { player } = battle;

    const loadedPlayer = this.playerStorage.loadPlayer(
      playerId,

      player.recivedEffects
    );

    if (!loadedPlayer) return;

    return new Observable<[Player, MobEntity]>((subscribe) => {
      const { mob } = battle;

      this.mobEntityFactory
        .loadFactory(
          mob.index,

          mob.recivedEffects
        )
        .subscribe({
          next: (loadedMob) => {
            subscribe.next([loadedPlayer, loadedMob]);
            subscribe.complete();
          },
          error: (e) => {
            console.warn(e);
          },
        });
    });
  }

  getPlayerWithStatusById(id: number): Player | void {
    const battle = this.getBattleByPlayerId(id);
    if (!battle) return;

    return this.playerStorage.loadPlayer(id, battle.player.recivedEffects);
  }

  setPlayerWithStatus(player: Player): void {
    const db = this.getDb();

    const battle = db[player.getId()];

    if (!battle) return;

    battle.player = { recivedEffects: player.getRecivedEffects() };

    db[player.getId()] = battle;

    this.writeDb(db);
  }
}

export interface BattleDb {
  [playerId: number]: BattleSchema | undefined;
}

interface BattleSchema {
  player: { recivedEffects: Effect[] };
  mob: {
    index: string;
    recivedEffects: Effect[];
  };
}
