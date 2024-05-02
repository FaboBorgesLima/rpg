import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationScreenComponent } from './preparation-screen.component';

describe('PreparationScreenComponent', () => {
  let component: PreparationScreenComponent;
  let fixture: ComponentFixture<PreparationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreparationScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreparationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
