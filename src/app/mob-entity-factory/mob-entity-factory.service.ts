import { Injectable } from '@angular/core';
import { DndApiService } from '../dnd-api/dnd-api.service';
import { Observable } from 'rxjs';
import { MobEntity } from '../entity/mob-entity/mob-entity';
import { MobClass } from '../game-class/mob-class/mob-class';

@Injectable({
  providedIn: 'root',
})
export class MobEntityFactoryService {
  constructor(private dndApi: DndApiService) {}

  factory(challengeRating?: number): Observable<MobEntity> {
    return new Observable((subscriber) => {
      this.dndApi.getRandomMonster(challengeRating).subscribe({
        error: () => {
          subscriber.error();
          subscriber.complete();
        },
        next: (monsterProps) => {
          subscriber.next(
            new MobEntity(
              new MobClass(
                monsterProps.xp,
                'mob',
                monsterProps.hit_points,
                monsterProps.strength,
                0,
                monsterProps.dexterity
              ),
              monsterProps.name,
              monsterProps.image ? monsterProps.image : ''
            )
          );
          subscriber.complete();
        },
      });
    });
  }
}
