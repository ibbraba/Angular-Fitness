import { TestBed } from '@angular/core/testing';

import { RecapServiceService } from './recap-service.service';

describe('RecapServiceService', () => {
  let service: RecapServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecapServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
