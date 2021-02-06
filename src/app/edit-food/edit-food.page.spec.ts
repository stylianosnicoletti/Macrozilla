import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditFoodPage } from './edit-food.page';

describe('EditFoodPage', () => {
  let component: EditFoodPage;
  let fixture: ComponentFixture<EditFoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFoodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
