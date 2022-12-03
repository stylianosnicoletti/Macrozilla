import { IonicModule } from '@ionic/angular';
import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabFoodsDatabasePage } from './tab-foods-database.page';

const routes: Routes = [
  {
    path: '',
    component: TabFoodsDatabasePage
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ 
      path: '',
       component: TabFoodsDatabasePage
       }
      ])
  ],
  declarations: [TabFoodsDatabasePage]
})
export class TabFoodsDatabasePageModule {}
