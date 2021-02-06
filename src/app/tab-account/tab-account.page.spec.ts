import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TabAccountPage } from './tab-account.page';

describe('TabAccountPage', () => {
  let component: TabAccountPage;
  let fixture: ComponentFixture<TabAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabAccountPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
