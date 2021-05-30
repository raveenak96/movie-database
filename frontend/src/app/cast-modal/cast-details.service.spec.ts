import { TestBed } from '@angular/core/testing';

import { CastDetailsService } from './cast-details.service';

describe('CastDetailsService', () => {
  let service: CastDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CastDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
