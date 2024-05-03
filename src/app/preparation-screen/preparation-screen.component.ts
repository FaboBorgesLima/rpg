import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preparation-screen',
  standalone: true,
  imports: [],
  templateUrl: './preparation-screen.component.html',
  styleUrl: './preparation-screen.component.css',
})
export class PreparationScreenComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}
  id: string = '';

  ngOnInit(): void {
    const urlId = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.id = urlId ? urlId : '';
  }
}
