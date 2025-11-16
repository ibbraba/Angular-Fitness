import { TestBed } from '@angular/core/testing';

import { HealthCalculatorService } from './recap-calculation.service';

describe('HealthCalculatorService', () => {
  let service: HealthCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
