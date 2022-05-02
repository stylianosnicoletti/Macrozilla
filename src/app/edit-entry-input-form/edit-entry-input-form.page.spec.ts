import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditEntryInputFormPage } from './edit-entry-input-form.page';

describe('EditEntryInputFormPage', () => {
  let component: EditEntryInputFormPage;
  let fixture: ComponentFixture<EditEntryInputFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEntryInputFormPage ],
      imports: [IonicModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEntryInputFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
