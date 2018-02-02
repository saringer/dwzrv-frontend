import { TestBed, inject } from '@angular/core/testing';

import { BreederService } from './breeder.service';

describe('BreederService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreederService]
    });
  });

  it('should be created', inject([BreederService], (service: BreederService) => {
    expect(service).toBeTruthy();
  }));
});
