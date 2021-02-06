import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TabFoodsDatabasePage } from './tab-foods-database.page';

describe('TabFoodsDatabasePage', () => {
  let component: TabFoodsDatabasePage;
  let fixture: ComponentFixture<TabFoodsDatabasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabFoodsDatabasePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabFoodsDatabasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
