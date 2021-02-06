import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddFoodPage } from './add-food.page';

describe('AddFoodPage', () => {
  let component: AddFoodPage;
  let fixture: ComponentFixture<AddFoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFoodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
