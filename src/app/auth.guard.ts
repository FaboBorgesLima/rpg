import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerStorageService } from './player-storage/player-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private playerStorage: PlayerStorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const id = route.queryParamMap.get('id');

    if (id && this.playerStorage.getById(parseInt(id))) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }
}

