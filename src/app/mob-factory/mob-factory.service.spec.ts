import { TestBed } from '@angular/core/testing';

import { MobFactoryService } from './mob-factory.service';

describe('MobFactoryService', () => {
  let service: MobFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
