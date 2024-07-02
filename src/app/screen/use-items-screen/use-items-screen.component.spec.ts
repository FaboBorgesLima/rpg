import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseItemsScreenComponent } from './use-items-screen.component';

describe('UseItemsComponent', () => {
  let component: UseItemsScreenComponent;
  let fixture: ComponentFixture<UseItemsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseItemsScreenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UseItemsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
