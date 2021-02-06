import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanEnterLoginPageGuard } from './guards/can-enter-login-page.guard';
import { CanEnterTabsPageGuard } from './guards/can-enter-tabs-page.guard';

const routes: Routes = [
  // If user inserts /login in URL then do..
  {
    path: 'login',
    // Remember to enter the guard to check if user is already logged in and redirect to tabs
    canActivate: [CanEnterLoginPageGuard],
    loadChildren: './login/login.module#LoginPageModule'
  },
  // If user inserts /register in URL then do..
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterPageModule'
  },
  // If user inserts /reset-password in URL then do..
  {
    path: 'reset_password',
    loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule'
  },
  // If user navigates to edit food page
  {
    path: 'edit_food/:food_key',
    canActivate: [CanEnterTabsPageGuard],
    loadChildren: () => import('./edit-food/edit-food.module').then(m => m.EditFoodPageModule)
  },
  {
    path: 'add_food',
    canActivate: [CanEnterTabsPageGuard],
    loadChildren: () => import('./add-food/add-food.module').then(m => m.AddFoodPageModule)
  },
  {
    path: 'add_entry/:date_selected',
    canActivate: [CanEnterTabsPageGuard],
    loadChildren: () => import('./add-entry/add-entry.module').then(m => m.AddEntryPageModule)
  },
  {
    canActivate: [CanEnterTabsPageGuard],
    // If user does not enter anything in URL then do..
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
