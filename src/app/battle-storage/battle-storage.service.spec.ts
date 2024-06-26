import { TestBed } from '@angular/core/testing';

import { BattleStorageService } from './battle-storage.service';

describe('BattleStorageService', () => {
  let service: BattleStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
