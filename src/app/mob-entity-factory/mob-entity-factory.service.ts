import { Injectable } from '@angular/core';
import {
  DndApiService,
  MonsterPropertiesReponse,
} from '../dnd-api/dnd-api.service';
import { Observable } from 'rxjs';
import { MobEntity } from '../entity/mob-entity/mob-entity';
import { MobClass } from '../game-class/mob-class/mob-class';
import { dndApiDomain } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class MobEntityFactoryService {
  constructor(private dndApi: DndApiService) {}

  createFactory(challengeRating?: number): Observable<MobEntity> {
    return new Observable((subscriber) => {
      this.dndApi.getRandomMonster(challengeRating).subscribe({
        error: () => {
          subscriber.error();
          subscriber.complete();
        },
        next: (monsterProps) => {
          subscriber.next(this.monsterPropertiesToMonsterEntity(monsterProps));
          subscriber.complete();
        },
      });
    });
  }

  getMonsterByIndex(index: string): Observable<MobEntity> {
    if (index == 'not found')
      return new Observable<MobEntity>((subscriber) => {
        subscriber.next(MobEntity.getDefault());
      });

    return new Observable<MobEntity>((subscriber) => {
      this.dndApi.getMonsterByIndex(index).subscribe({
        next: (monsterProps) => {
          subscriber.next(this.monsterPropertiesToMonsterEntity(monsterProps));
          subscriber.complete();
        },
      });
    });
  }

  private monsterPropertiesToMonsterEntity(
    monsterProps: MonsterPropertiesReponse
  ): MobEntity {
    const mobClass = new MobClass(
      monsterProps.xp,
      'mob',
      monsterProps.hit_points,
      monsterProps.strength * 0.2,
      monsterProps.constitution * 2,
      monsterProps.dexterity,
      monsterProps.dexterity * 9
    );
    const mob = new MobEntity(
      mobClass,
      monsterProps.name,
      monsterProps.image ? `${dndApiDomain}${monsterProps.image}` : '',
      monsterProps.index
    );
    return mob;
  }

  loadFactory(
    index: string,
    stamina: number,
    remainingLife: number
  ): Observable<MobEntity> {
    console.debug(
      'load factory stamina,remaining life',
      stamina,
      remainingLife
    );

    return new Observable((subscriber) => {
      this.getMonsterByIndex(index).subscribe({
        next: (mob) => {
          mob.setRemainingLife(remainingLife);

          mob.setStamina(stamina);

          console.debug('load factory mob', mob);

          subscriber.next(mob);
          subscriber.complete();
        },
      });
    });
  }
}
