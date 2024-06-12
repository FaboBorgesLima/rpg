import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MobService } from '../mob-service/mob.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  // Delete this later :)
  constructor (
    private mobService: MobService,
  ) {}
  ngOnInit(): void {
    this.mobService.logMonster();
  }
}
