import { Injectable } from '@angular/core';
import { DndApiService } from '../dnd-api/dnd-api.service';
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
          const mobClass = new MobClass(
            monsterProps.xp,
            'mob',
            monsterProps.hit_points,
            monsterProps.strength * 0.2,
            monsterProps.constitution * 2,
            monsterProps.dexterity
          );
          subscriber.next(
            new MobEntity(
              mobClass,
              monsterProps.name,
              monsterProps.image ? `${dndApiDomain}${monsterProps.image}` : '',
              monsterProps.index
            )
          );
          subscriber.complete();
        },
      });
    });
  }

  loadFactory(
    name: string,
    stamina: number,
    remainingLife: number
  ): Observable<MobEntity> {
    return new Observable((subscriber) => {
      this.dndApi.getMonsterByIndex(name).subscribe({
        error: () => {
          subscriber.error();
          subscriber.complete();
        },
        next: (monsterProps) => {
          const mobClass = new MobClass(
            monsterProps.xp,
            'mob',
            monsterProps.hit_points,
            monsterProps.strength * 0.2,
            monsterProps.constitution * 2,
            monsterProps.dexterity
          );
          const mob = new MobEntity(
            mobClass,
            monsterProps.name,
            monsterProps.image ? `${dndApiDomain}${monsterProps.image}` : '',
            monsterProps.index
          );

          mob.setRemainingLife(remainingLife);

          mob.setStamina(stamina);

          subscriber.next(mob);
          subscriber.complete();
        },
      });
    });
  }
}
