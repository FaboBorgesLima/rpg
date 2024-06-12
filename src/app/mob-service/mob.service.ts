import { Injectable } from '@angular/core';
import { GameClass } from '../game-class/game-class';
import { DndApiService } from '../dnd-api/dnd-api.service';

@Injectable({
  providedIn: 'root'
})
export class MobService {

  constructor(
    // public mobEntity :GameClass,
    private dndApi: DndApiService,
  ) { }

  public logMonster() {
    console.log(this.dndApi.getRandomMonster());
  }

  // public createMob(): GameClass {
  //   this.mobEntity.
  // }

  // public printMob(): GameClass {
  //   return this.dndApi.getRandomMonster();
  // }

}
