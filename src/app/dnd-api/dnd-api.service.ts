import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DndApiService {
  private domain: string = 'https://www.dnd5eapi.co';
  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @param challengeRating needs to be a number between 0 and 30
   * @returns
   */
  getMonstersList(challengeRating?: number): Observable<MonstersListReponse> {
    if (challengeRating) {
      return this.httpClient.get<MonstersListReponse>(
        this.domain + '/api/monsters',
        {
          params: {
            challenge_rating: this.numberBetween(challengeRating, 0, 30),
          },
        }
      );
    }

    return this.httpClient.get<MonstersListReponse>(
      this.domain + '/api/monsters'
    );
  }

  /**
   *
   * @param index monster index can be obtained from getMonstersList
   * @returns
   */
  getMonsterByIndex(index: string): Observable<MonsterPropertiesReponse> {
    return this.httpClient.get<MonsterPropertiesReponse>(
      `${this.domain}/api/monsters/${index}`
    );
  }

  getRandomMonster(
    challengeRating?: number
  ): Observable<MonsterPropertiesReponse> {
    // creates observable
    const randomMonsterObservable = new Observable<MonsterPropertiesReponse>(
      (randomMonsterObserver) => {
        this.getMonstersList(challengeRating).subscribe({
          // if successfully gets monsters list
          next: (monstersList) => {
            // generate random index
            const randomIndex = Math.trunc(
              (monstersList.results.length + 1) * Math.random()
            );

            this.getMonsterByIndex(
              monstersList.results[randomIndex].index
            ).subscribe({
              // if successfully gets monster
              next: (monster) => {
                randomMonsterObserver.next(monster);
                // close connection
                randomMonsterObserver.complete();
              },
              error: (e) => {
                randomMonsterObserver.error(e);
                randomMonsterObserver.complete();
              },
            });
          },
          error: (e) => {
            randomMonsterObserver.error(e);
            randomMonsterObserver.complete();
          },
        });

        return { unsubscribe() {} };
      }
    );

    return randomMonsterObservable;
  }

  /**
   *
   * @param n the number
   * @param min minimum value
   * @param max maximum value
   * @returns a number between min and max
   */
  private numberBetween(n: number, min: number, max: number) {
    return Math.max(Math.min(n, max), min);
  }
}

/**
 * this is the list of monsters
 */
export interface MonstersListReponse {
  count: number;
  results: { index: string; name: string; url: string }[];
}

/**
 * this interface is incomplete, there is a lot of stuff in the api, but there is no need to all of them
 */
export interface MonsterPropertiesReponse {
  index: string;
  name: string;
  desc: string;
  strength: number;
  dexterity: number;
  xp: number;
  image: string;
  url: string;
  hit_points: number;
}
