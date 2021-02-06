import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEntryPage } from './add-entry.page';

describe('AddEntryPage', () => {
  let component: AddEntryPage;
  let fixture: ComponentFixture<AddEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
