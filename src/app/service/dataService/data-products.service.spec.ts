import { TestBed, inject } from '@angular/core/testing';

import { DataProductsService } from './data-products.service';

describe('DataProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataProductsService]
    });
  });

  it('should be created', inject([DataProductsService], (service: DataProductsService) => {
    expect(service).toBeTruthy();
  }));
});
