import { TestBed } from '@angular/core/testing';

import { MobEntityFactoryService } from './mob-entity-factory.service';

describe('MobEntityFactoryService', () => {
  let service: MobEntityFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobEntityFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
