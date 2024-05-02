import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  @Input({ required: true }) isMenuOpen!: boolean;
  @Output() isMenuOpenChange = new EventEmitter<boolean>();

  closeMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    this.isMenuOpenChange.emit(this.isMenuOpen);
  }
}
