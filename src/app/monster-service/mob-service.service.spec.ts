import { TestBed } from '@angular/core/testing';

import { MobServiceService } from './mob-service.service';

describe('MobServiceService', () => {
  let service: MobServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
