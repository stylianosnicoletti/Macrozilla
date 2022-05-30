import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TransferEntriesPage } from './transfer-entries.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ 
      path: '',
     component: TransferEntriesPage
     }
    ])
],
declarations: [TransferEntriesPage],
providers: [
  DatePipe]
})
export class TransferEntriesPageModule {}
