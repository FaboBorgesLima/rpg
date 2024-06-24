import { Injectable } from '@angular/core';
import { PlayerDb } from '../player-storage/player-storage.service';
import { GameClassesNames } from '../game-class/game-class';

@Injectable({
  providedIn: 'root',
})
export class PeoplePlayingService {
  private pantryId = '95acaff8-f90e-457c-a899-ed3187832e60';

  constructor() {}

  async getPeoplePlaying(): Promise<PeoplePlayingDb> {
    try {
      const res = await fetch(
        `https://getpantry.cloud/apiv1/pantry/${this.pantryId}/basket/rpg`
      );

      const data: PeoplePlayingDb = await res.json();

      console.log('get', data);

      if (!data['saves']) return { saves: {}, keysLength: 3 };

      return data;
    } catch {
      try {
        const res = await fetch(
          `https://getpantry.cloud/apiv1/pantry/${this.pantryId}/basket/rpg`,
          {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
          }
        );
      } catch {}
    }
    return { saves: {}, keysLength: 3 };
  }

  async updatePeoplePlaying(db: PeoplePlayingDb): Promise<boolean> {
    try {
      await fetch(
        `https://getpantry.cloud/apiv1/pantry/${this.pantryId}/basket/rpg`,
        {
          method: 'PUT',
          body: JSON.stringify(db),
          headers: new Headers({ 'Content-Type': 'application/json' }),
        }
      );
      return true;
    } catch {}

    return false;
  }

  async syncPlayerSaves(playerDb: PlayerDb): Promise<boolean> {
    const db = await this.getPeoplePlaying();

    console.log('sync in', db);

    const playerDbKeys = Object.keys(playerDb);

    for (const key of playerDbKeys) {
      const player = playerDb[parseInt(key)];
      db.saves[player.externalId] = {
        gameClass: player.gameClass,
        xp: player.xp,
        name: player.name,
      };
    }
    console.log('sync out', db);

    try {
      await this.updatePeoplePlaying(db);
    } catch {}

    return true;
  }

  async deleteAll(): Promise<boolean> {
    try {
      await fetch(
        `https://getpantry.cloud/apiv1/pantry/${this.pantryId}/basket/rpg`,
        {
          method: 'DELETE',
        }
      );
      return true;
    } catch {}

    return false;
  }
}
export interface PeoplePlayingDb {
  saves: {
    [k: string]: { gameClass: GameClassesNames; xp: number; name: string };
  };
  keysLength: 3;
}
