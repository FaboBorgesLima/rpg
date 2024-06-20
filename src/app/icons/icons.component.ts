import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [NgSwitchCase, NgSwitch],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.css',
})
export class IconsComponent {
  @Input({ required: true }) name!: IconsT;
  @Input({ required: true }) alt!: string;
}
export type IconsT = 'heart' | 'scroll' | 'sword' | 'helmet';
