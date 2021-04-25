import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TabFoodsDatabasePage } from './tab-foods-database.page';

describe('TabFoodsDatabasePage', () => {
  let component: TabFoodsDatabasePage;
  let fixture: ComponentFixture<TabFoodsDatabasePage>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [TabFoodsDatabasePage],
      imports: [IonicModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TabFoodsDatabasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
