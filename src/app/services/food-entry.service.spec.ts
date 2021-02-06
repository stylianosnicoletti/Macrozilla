import { TestBed } from '@angular/core/testing';

import { FoodEntryService } from './food-entry.service';

describe('FoodEntryService', () => {
  let service: FoodEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
