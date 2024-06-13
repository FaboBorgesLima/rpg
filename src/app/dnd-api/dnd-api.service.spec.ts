import { TestBed } from '@angular/core/testing';

import { DndApiService } from './dnd-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DndApiService', () => {
  let service: DndApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DndApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
