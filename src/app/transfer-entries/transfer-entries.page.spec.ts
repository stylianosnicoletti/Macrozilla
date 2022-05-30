import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransferEntriesPage } from './transfer-entries.page';

describe('AddEntrySearchPage', () => {
  let component: TransferEntriesPage;
  let fixture: ComponentFixture<TransferEntriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferEntriesPage ],
      imports: [IonicModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferEntriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
