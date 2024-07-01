import { Injectable } from '@angular/core';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { MobEntityFactoryService } from '../mob-entity-factory/mob-entity-factory.service';
import { Player } from '../entity/player/player';
import { MobEntity } from '../entity/mob-entity/mob-entity';
import { Observable } from 'rxjs';

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
        remainingLife: player.getRemainingLife(),
        stamina: player.getStamina(),
      },
      mob: {
        remainingLife: mobEntity.getRemainingLife(),
        stamina: mobEntity.getStamina(),
        index: mobEntity.index,
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
      player.remainingLife,
      player.stamina
    );

    if (!loadedPlayer) return;

    return new Observable<[Player, MobEntity]>((subscribe) => {
      const { mob } = battle;

      this.mobEntityFactory
        .loadFactory(mob.index, mob.stamina, mob.remainingLife)
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
}

export interface BattleDb {
  [playerId: number]: BattleSchema | undefined;
}

interface BattleSchema {
  player: { remainingLife: number; stamina: number };
  mob: { remainingLife: number; stamina: number; index: string };
}
