import { Injectable } from '@angular/core';
import { Player } from './player/player';

@Injectable({
  providedIn: 'root'
})
export class DbInsertPlayerService {
  constructor() { }

  public createPlayer(player: Player):void {
    fetch("http://localhost:3000/players")
    .then(response => {
      return response.json();
    })
    .then(data => {
      switch (player["characterClass"]) {
        case "warrior":
          player.setAttack(8);
          player.setDefense(4);
          player.setHitPoints(10);
          player.setId(data.length + 1);
  
          break;
  
        case "thief":
          player.setAttack(4);
          player.setDefense(2);
          player.setHitPoints(7);
          player.setId(data.length + 1);
  
          break;
      
        default:
          break;
      }
  
      const jsonPlayer = JSON.stringify(player);
  
      fetch("http://localhost:3000/players", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        body: jsonPlayer
      })
    });
  }
}
