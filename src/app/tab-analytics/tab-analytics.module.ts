import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabAnalyticsPage } from './tab-analytics.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TabAnalyticsPage }])
  ],
  declarations: [TabAnalyticsPage]
})
export class TabAnalyticsPageModule {}
