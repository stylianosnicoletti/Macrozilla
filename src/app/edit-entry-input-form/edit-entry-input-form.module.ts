import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditEntryInputFormPage } from './edit-entry-input-form.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ 
      path: '',
     component: EditEntryInputFormPage
     }
    ])
],
  declarations: [EditEntryInputFormPage]
})
export class EditEntryInputFormPageModule {}
