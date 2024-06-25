import { inject } from '@angular/core';

import { PlayerStorageService } from './player-storage/player-storage.service';

import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const playerStorage = inject(PlayerStorageService);

  const id = route.queryParamMap.get('id');

  if (!id) return false;

  const player = playerStorage.getById(parseInt(id));

  if (!player) return false;

  return true;
};
