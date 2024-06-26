import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightScreenComponent } from './fight-screen.component';

describe('FightScreenComponent', () => {
  let component: FightScreenComponent;
  let fixture: ComponentFixture<FightScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FightScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FightScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
