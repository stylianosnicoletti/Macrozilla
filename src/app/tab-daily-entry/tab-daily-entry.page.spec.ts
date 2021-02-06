import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabDailyEntryPage } from './tab-daily-entry.page';

describe('Tab1Page', () => {
  let component: TabDailyEntryPage;
  let fixture: ComponentFixture<TabDailyEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabDailyEntryPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabDailyEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
