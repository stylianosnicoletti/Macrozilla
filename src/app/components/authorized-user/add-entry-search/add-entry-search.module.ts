import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddEntrySearchPage } from './add-entry-search.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ 
      path: '',
     component: AddEntrySearchPage
     }
    ])
],
  declarations: [AddEntrySearchPage]
})
export class AddEntrySearchPageModule {}
