import { TestBed } from '@angular/core/testing';

import { PeoplePlayingService } from './people-playing.service';

describe('PeoplePlayingService', () => {
  let service: PeoplePlayingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeoplePlayingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
