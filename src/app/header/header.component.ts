import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input({ required: true }) isMenuOpen!: boolean;
  @Output() isMenuOpenChange = new EventEmitter<boolean>();

  onClickMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    this.isMenuOpenChange.emit(this.isMenuOpen);
  }
}
