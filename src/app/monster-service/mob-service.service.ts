import { Injectable, OnInit } from '@angular/core';
import { GameClass } from '../game-class/game-class';
var json = require('./monsters.json');

@Injectable({
  providedIn: 'root'
})
export class MobServiceService {

  constructor(
    public gameClass: GameClass,
  ) {}

  public getMonster(floor: number): GameClass {
    const monster = json[0][floor];
  }

  public create(monster: string): GameClass {
    fetch('https://www.dnd5eapi.co/api/monsters?name=' + monster), {
      
    }
  }

}
