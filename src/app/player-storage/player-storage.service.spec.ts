import { TestBed } from '@angular/core/testing';

import { PlayerStorageService } from './player-storage.service';

describe('PlayerServiceService', () => {
  let service: PlayerStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
