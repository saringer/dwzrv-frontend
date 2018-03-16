import { TestBed, inject } from '@angular/core/testing';

import { CoursingService } from './coursing.service';

describe('CoursingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursingService]
    });
  });

  it('should be created', inject([CoursingService], (service: CoursingService) => {
    expect(service).toBeTruthy();
  }));
});
