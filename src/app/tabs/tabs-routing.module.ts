import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { CanEnterTabsPageGuard } from '../guards/can-enter-tabs-page.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    // Remember to enter the guard that checks if user is authenticated to enter the tabs
    canActivate: [CanEnterTabsPageGuard],
    children: [
      {
        path: 'daily_entry',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab-daily-entry/tab-daily-entry.module').then(m => m.TabDailyEntryPageModule)
          }
        ]
      },
      {
        path: 'foods_database',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab-foods-database/tab-foods-database.module').then(m => m.TabFoodsDatabasePageModule)
          }
        ]
      },
      {
        path: 'analytics',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab-analytics/tab-analytics.module').then(m => m.TabAnalyticsPageModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab-account/tab-account.module').then(m => m.TabAccountPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/daily_entry',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
