import { TestBed, inject } from '@angular/core/testing';

import { RaceRankingServiceService } from './race-ranking.service';

describe('RaceRankingServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaceRankingServiceService]
    });
  });

  it('should be created', inject([RaceRankingServiceService], (service: RaceRankingServiceService) => {
    expect(service).toBeTruthy();
  }));
});
