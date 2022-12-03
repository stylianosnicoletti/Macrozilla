import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorizedUserPageRoutingModule } from './authorized-user-routing.module';
import { AuthorizedUserPage } from './authorized-user.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AuthorizedUserPageRoutingModule
  ],
  declarations: [AuthorizedUserPage]
})
export class AuthorizedUserPageModule {}
