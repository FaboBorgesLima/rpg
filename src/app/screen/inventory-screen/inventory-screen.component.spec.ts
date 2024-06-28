import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InventoryScreenComponent } from './inventory-screen.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';

describe('InventoryScreenComponent', () => {
  let component: InventoryScreenComponent;
  let fixture: ComponentFixture<InventoryScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InventoryScreenComponent,
        RouterModule.forRoot([{ path: '', component: HomePageComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
