import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SimpleLoadingStrategy } from './loadingStrategies/simpleLoadingStrategy';

const routes: Routes = [
  {
  // If user does not enter anything in URL reroute to login..
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // If user inserts /login in URL then do..
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginPageModule)
  },
  // If user inserts /register in URL then do..
  {
    path: 'register',
    loadChildren: () => import('./components/register/register.module').then(m => m.RegisterPageModule)
  },
  // If user inserts /reset-password in URL then do..
  {
    path: 'reset_password',
    loadChildren: () => import('./components/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  // If user does not enter anything in URL then do..
  {
    path: 'authorized_user',
    loadChildren: () => import('./components/authorized-user/authorized-user.module').then(m => m.AuthorizedUserPageModule),
    data: {
      preload: true
    },
  },
  {
  //If path doesn't match anything reroute to 'login' (Leave it at the end)
    path: '**', 
    redirectTo: '/login',
    pathMatch: 'full'
  }

];
@NgModule({
  providers: [SimpleLoadingStrategy],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: SimpleLoadingStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }