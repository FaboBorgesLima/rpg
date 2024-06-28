import { Routes } from '@angular/router';
import { HomePageComponent } from './screen/home-page/home-page.component';
import { NewGameComponent } from './screen/new-game/new-game.component';
import { LoadGameComponent } from './load-game/load-game.component';
import { PreparationScreenComponent } from './screen/preparation-screen/preparation-screen.component';
import { InventoryScreenComponent } from './screen/inventory-screen/inventory-screen.component';
import { FightScreenComponent } from './screen/fight-screen/fight-screen.component';
import { ShopScreenComponent } from './screen/shop-screen/shop-screen.component';
import { StatusScreenComponent } from './screen/status-screen/status-screen.component';
import { AboutScreenComponent } from './screen/about-screen/about-screen.component';
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
