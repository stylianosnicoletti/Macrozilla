import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEntrySearchPage } from './add-entry-search.page';

describe('AddEntrySearchPage', () => {
  let component: AddEntrySearchPage;
  let fixture: ComponentFixture<AddEntrySearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntrySearchPage ],
      imports: [IonicModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEntrySearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
