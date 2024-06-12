import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NewGameComponent } from './new-game/new-game.component';
import { LoadGameComponent } from './load-game/load-game.component';
import { PreparationScreenComponent } from './preparation-screen/preparation-screen.component';
import { InventoryScreenComponent } from './inventory-screen/inventory-screen.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'new-game', component: NewGameComponent, pathMatch: 'full' },
  { path: 'load-game', component: LoadGameComponent, pathMatch: 'full' },
  {
    path: 'preparation-screen',
    component: PreparationScreenComponent,
    pathMatch: 'full',
  },
  { path: 'inventory', component: InventoryScreenComponent, pathMatch: 'full' },
];
