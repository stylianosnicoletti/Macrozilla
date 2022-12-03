import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabDailyEntryPage } from './tab-daily-entry.page';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TabDailyEntryPage }])
  ],
  declarations: [TabDailyEntryPage],
  providers: [
    DatePipe]
})
export class TabDailyEntryPageModule { }
