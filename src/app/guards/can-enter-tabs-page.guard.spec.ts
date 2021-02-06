import { TestBed, async, inject } from '@angular/core/testing';

import { CanEnterTabsPageGuard } from './can-enter-tabs-page.guard';

describe('CanEnterTabsPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanEnterTabsPageGuard]
    });
  });

  it('should ...', inject([CanEnterTabsPageGuard], (guard: CanEnterTabsPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
