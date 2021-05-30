import { TestBed } from '@angular/core/testing';

import { StaticCarouselService } from './static-carousel.service';

describe('StaticCarouselService', () => {
  let service: StaticCarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticCarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
