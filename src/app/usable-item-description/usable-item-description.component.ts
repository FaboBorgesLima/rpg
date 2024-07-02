import { Component, Input } from '@angular/core';
import { UsableItem } from '../game-item/usables/usable-item';

@Component({
  selector: 'app-usable-item-description',
  standalone: true,
  imports: [],
  templateUrl: './usable-item-description.component.html',
  styleUrl: './usable-item-description.component.css',
})
export class UsableItemDescriptionComponent {
  @Input({ required: true }) item!: UsableItem;
}
