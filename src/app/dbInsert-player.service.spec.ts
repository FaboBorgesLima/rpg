import { TestBed } from '@angular/core/testing';

import { DbInsertPlayerService } from './dbInsert-player.service';

describe('DbinsertPlayerService', () => {
  let service: DbInsertPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbInsertPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
