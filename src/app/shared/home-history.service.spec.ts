import { TestBed } from '@angular/core/testing';

import { HomeHistoryService } from './home-history.service';

describe('HomeHistoryService', () => {
  let service: HomeHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
