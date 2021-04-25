import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabAnalyticsPage } from './tab-analytics.page';

describe('TabAnalyticsPage', () => {
  let component: TabAnalyticsPage;
  let fixture: ComponentFixture<TabAnalyticsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAnalyticsPage ],
      imports: [IonicModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TabAnalyticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
