import { Component, Input, OnInit } from '@angular/core';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameClass } from '../game-class/game-class';

@Component({
  selector: 'app-life-bar',
  standalone: true,
  imports: [],
  templateUrl: './life-bar.component.html',
  styleUrl: './life-bar.component.css',
})
export class LifeBarComponent implements OnInit {
  constructor(private playerStorage: PlayerStorageService) {}

  @Input({ required: true }) entity!: GameClass;

  entityLife: number = 0;
  entityRemainingLife: number = 0;
  hpBarLevel: string = '';

  ngOnInit(): void {
    // TESTE ### REMOVER DEPOIS
    this.entity.receiveAttack(25);
    //
    this.entityLife = this.entity.getLife();
    this.entityRemainingLife = this.entity.getRemaingLife();
    this.hpBarLevel =
      Math.trunc((this.entityRemainingLife / this.entityLife) * 100) + '%';
  }
}
