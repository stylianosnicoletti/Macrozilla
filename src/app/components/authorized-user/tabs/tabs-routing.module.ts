import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { CanEnterTabsPageGuard } from '../../../guards/can-enter-tabs-page.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [CanEnterTabsPageGuard],
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'daily_entry',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tab-daily-entry/tab-daily-entry.module').then(m => m.TabDailyEntryPageModule),
            data: {
              preload: true
            }
          }
        ]
      },
      {
        path: 'foods_database',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tab-foods-database/tab-foods-database.module').then(m => m.TabFoodsDatabasePageModule)
          }
        ]
      },
      {
        path: 'analytics',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tab-analytics/tab-analytics.module').then(m => m.TabAnalyticsPageModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tab-account/tab-account.module').then(m => m.TabAccountPageModule)
          }
        ]
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
export class TabsPageRoutingModule { }
