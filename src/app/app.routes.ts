import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NewGameComponent } from './new-game/new-game.component';
import { LoadGameComponent } from './load-game/load-game.component';
import { PreparationScreenComponent } from './preparation-screen/preparation-screen.component';
import { InventoryScreenComponent } from './inventory-screen/inventory-screen.component';
import { FightScreenComponent } from './fight-screen/fight-screen.component';
import { ShopScreenComponent } from './shop-screen/shop-screen.component';
import { StatusScreenComponent } from './status-screen/status-screen.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'new-game', component: NewGameComponent, pathMatch: 'full' },
  { path: 'load-game', component: LoadGameComponent, pathMatch: 'full' },
  {
    path: 'preparation-screen',
    component: PreparationScreenComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  { path: 'status', component: StatusScreenComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryScreenComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'fight-screen', component: FightScreenComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'shop', component: ShopScreenComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '', component: HomePageComponent, pathMatch: 'full' },
];
