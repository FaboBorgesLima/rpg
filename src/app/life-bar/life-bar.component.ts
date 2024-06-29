import { Component, Injectable, Input, OnInit } from '@angular/core';
// import { PlayerStorageService } from '../player-storage/player-storage.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { GameClass } from '../game-class/game-class';
import { Entity } from '../entity/entity';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-life-bar',
  standalone: true,
  imports: [],
  templateUrl: './life-bar.component.html',
  styleUrl: './life-bar.component.css',
  providers: [PercentPipe],
})
export class LifeBarComponent {
  constructor(private percentPipe: PercentPipe) {}

  @Input({ required: true }) entity!: Entity;

  getLength(): string {
    const percent: number = this.entity.getRemainingLifePercentage();
    return this.percentPipe.transform(percent, '1.0-0')!;
  }
  getLengthStamina(): string {
    const percent: number = this.entity.getStaminaPercentage();
    return this.percentPipe.transform(percent, '1.0-0')!;
  }

  min0(n: number): number {
    return Math.max(n, 0);
  }
}
