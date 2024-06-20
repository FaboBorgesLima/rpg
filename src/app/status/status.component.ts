import { Component, Input } from '@angular/core';
import { IconsComponent, IconsT } from '../icons/icons.component';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css',
})
export class StatusComponent {
  @Input({ required: true }) amount!: number;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) icon!: IconsT;
}
