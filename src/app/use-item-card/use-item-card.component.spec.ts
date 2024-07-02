import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseItemCardComponent } from './use-item-card.component';

describe('UseItemCardComponent', () => {
  let component: UseItemCardComponent;
  let fixture: ComponentFixture<UseItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseItemCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UseItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
