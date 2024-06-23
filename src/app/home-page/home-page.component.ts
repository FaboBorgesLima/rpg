import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlayerStorageService } from '../player-storage/player-storage.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  constructor(
    public playerStorageService: PlayerStorageService,
  ) {}
}
