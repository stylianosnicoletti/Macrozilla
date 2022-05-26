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
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  // If user inserts /register in URL then do..
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  // If user inserts /reset-password in URL then do..
  {
    path: 'reset_password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  // If user navigates to edit food page
  {
    path: 'edit_food/:food_doc_id',
    canActivate: [CanEnterTabsPageGuard],
    loadChildren: () => import('./edit-food/edit-food.module').then(m => m.EditFoodPageModule)
  },
  // If user navigates to add food page
  {
    path: 'add_food',
    canActivate: [CanEnterTabsPageGuard],
    loadChildren: () => import('./add-food/add-food.module').then(m => m.AddFoodPageModule)
  },
  // If user navigates to add entry search page
  {
    path: 'add_entry_search/:date_selected',
    canActivate: [CanEnterTabsPageGuard],
    loadChildren: () => import('./add-entry-search/add-entry-search.module').then(m => m.AddEntrySearchPageModule)
  },
  // If user navigates to repeat entriespage
  {
    path: 'repeat_entries/:date_selected',
    canActivate: [CanEnterTabsPageGuard],
    loadChildren: () => import('./repeat-entries/repeat-entries.module').then(m => m.RepeatEntriesPageModule)
  },
  // If user navigates to edit entry
  {
    path: 'edit_entry_input_form/:date_selected/:entry_doc_id',
    canActivate: [CanEnterTabsPageGuard],
    loadChildren: () => import('./edit-entry-input-form/edit-entry-input-form.module').then(m => m.EditEntryInputFormPageModule)
  },
  // If user navigates to add entry input form page
  {
    path: 'add_entry_input_form/:date_selected/:food_doc_id',
    canActivate: [CanEnterTabsPageGuard],
    loadChildren: () => import('./add-entry-input-form/add-entry-input-form.module').then(m => m.AddEntryInputFormPageModule)
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
