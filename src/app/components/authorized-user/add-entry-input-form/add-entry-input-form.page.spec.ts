import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEntryInputFormPage } from './add-entry-input-form.page';

describe('AddEntryInputFormPage', () => {
  let component: AddEntryInputFormPage;
  let fixture: ComponentFixture<AddEntryInputFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntryInputFormPage ],
      imports: [IonicModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEntryInputFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
