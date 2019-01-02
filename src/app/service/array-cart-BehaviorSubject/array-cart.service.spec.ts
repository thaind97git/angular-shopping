import { TestBed, inject } from '@angular/core/testing';

import { ArrayCartService } from './array-cart.service';

describe('ArrayCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArrayCartService]
    });
  });

  it('should be created', inject([ArrayCartService], (service: ArrayCartService) => {
    expect(service).toBeTruthy();
  }));
});
