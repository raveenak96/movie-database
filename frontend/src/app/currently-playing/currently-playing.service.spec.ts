import { TestBed } from '@angular/core/testing';

import { CurrentlyPlayingService } from './currently-playing.service';

describe('CurrentlyPlayingService', () => {
  let service: CurrentlyPlayingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentlyPlayingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
