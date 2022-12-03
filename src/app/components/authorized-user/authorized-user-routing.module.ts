import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanEnterAuthorizedUserPageGuard } from '../../guards/can-enter-authorized-user-page.guard';
import { AuthorizedUserPage } from './authorized-user.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [CanEnterAuthorizedUserPageGuard],
    component: AuthorizedUserPage,
    children: [
      {
        // If user does not enter anything in URL reroute to login..
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      // If user navigates to edit food page
      {
        path: 'edit_food/:food_doc_id',
        loadChildren: () => import('./edit-food/edit-food.module').then(m => m.EditFoodPageModule)
      },
      // If user navigates to add food page
      {
        path: 'add_food',
        loadChildren: () => import('./add-food/add-food.module').then(m => m.AddFoodPageModule),
      },
      // If user navigates to add entry search page
      {
        path: 'add_entry_search/:date_selected',
        loadChildren: () => import('./add-entry-search/add-entry-search.module').then(m => m.AddEntrySearchPageModule),
        data: {
          preload: true
        },
      },
      // If user navigates to transfer entriespage
      {
        path: 'transfer_entries/:date_selected',
        loadChildren: () => import('./transfer-entries/transfer-entries.module').then(m => m.TransferEntriesPageModule),
        data: {
          preload: true
        },
      },
      // If user navigates to edit entry
      {
        path: 'edit_entry_input_form/:date_selected/:entry_doc_id',
        loadChildren: () => import('./edit-entry-input-form/edit-entry-input-form.module').then(m => m.EditEntryInputFormPageModule)
      },
      // If user navigates to add entry input form page
      {
        path: 'add_entry_input_form/:date_selected/:food_doc_id',
        loadChildren: () => import('./add-entry-input-form/add-entry-input-form.module').then(m => m.AddEntryInputFormPageModule)
      },
      {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
        data: {
          preload: true
        },
      },
      {
        // If user does not enter anything in URL reroute to login..
        path: '**',
        redirectTo: '/login',
        pathMatch: 'full'
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizedUserPageRoutingModule { }
