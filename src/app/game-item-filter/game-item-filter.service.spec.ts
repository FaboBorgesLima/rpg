import { TestBed } from '@angular/core/testing';

import { GameItemFilterService } from './game-item-filter.service';

describe('GameItemFilterService', () => {
  let service: GameItemFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameItemFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
