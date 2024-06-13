import { Component, Input, OnInit } from '@angular/core';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameClass } from '../game-class/game-class';
import { Entity } from '../entity/entity';

@Component({
  selector: 'app-life-bar',
  standalone: true,
  imports: [],
  templateUrl: './life-bar.component.html',
  styleUrl: './life-bar.component.css',
})
export class LifeBarComponent {
  @Input({ required: true }) entity!: Entity;
}
