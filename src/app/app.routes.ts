import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NewGameComponent } from './new-game/new-game.component';
import { LoadGameComponent } from './load-game/load-game.component';
import { PreparationScreenComponent } from './preparation-screen/preparation-screen.component';
import { InventoryScreenComponent } from './inventory-screen/inventory-screen.component';
import { FightScreenComponent } from './fight-screen/fight-screen.component';
import { ShopScreenComponent } from './shop-screen/shop-screen.component';
import { StatusScreenComponent } from './status-screen/status-screen.component';
import { AboutScreenComponent } from './about-screen/about-screen.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'new-game', component: NewGameComponent, pathMatch: 'full' },
  { path: 'load-game', component: LoadGameComponent, pathMatch: 'full' },
  {
    path: 'preparation-screen',
    component: PreparationScreenComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  { path: 'about', component: AboutScreenComponent, pathMatch: 'full' },
  {
    path: 'status',
    component: StatusScreenComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  {
    path: 'inventory',
    component: InventoryScreenComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  {
    path: 'fight-screen',
    component: FightScreenComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  {
    path: 'shop',
    component: ShopScreenComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  { path: '', component: HomePageComponent, pathMatch: 'full' },
];
