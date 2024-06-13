import { Injectable } from '@angular/core';
import { DndApiService } from '../dnd-api/dnd-api.service';
import { Observable } from 'rxjs';
import { Mob } from '../mob/mob';
import { dndApiDomain } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class MobFactoryService {
  constructor(private dndApi: DndApiService) {}

  factory(challengeRating?: number): Observable<Mob> {
    return new Observable<Mob>((subscriber) => {
      this.dndApi.getRandomMonster(challengeRating).subscribe({
        error: () => {
          subscriber.error();
          subscriber.complete();
        },
        next: (mobProperties) => {
          subscriber.next(
            new Mob(
              mobProperties.name,
              mobProperties.xp,
              mobProperties.strength,
              0,
              mobProperties.hit_points,
              mobProperties.image ? dndApiDomain + mobProperties.image : '',
              mobProperties.url
            )
          );
          subscriber.complete();
        },
      });
    });
  }

  getDefaultMob(): Mob {
    return new Mob('404', 100, 10, 10, 404, '', '');
  }
}
