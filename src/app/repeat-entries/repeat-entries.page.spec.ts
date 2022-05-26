import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RepeatEntriesPage } from './repeat-entries.page';

describe('AddEntrySearchPage', () => {
  let component: RepeatEntriesPage;
  let fixture: ComponentFixture<RepeatEntriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatEntriesPage ],
      imports: [IonicModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RepeatEntriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
