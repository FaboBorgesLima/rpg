import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsableItemDescriptionComponent } from './usable-item-description.component';

describe('UsableItemDescriptionComponent', () => {
  let component: UsableItemDescriptionComponent;
  let fixture: ComponentFixture<UsableItemDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsableItemDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsableItemDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
