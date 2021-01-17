import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/_auth/auth.guard';
import { SessionLessGuard } from './core/_auth/SessionLess.guard';


const routes: Routes = [
  /*{ path: 'home',loadChildren: './core/pages/home/home.module#HomeModule'},//*/
  { path: 'login',canActivate: [SessionLessGuard], loadChildren: './core/pages/login/login.module#LoginModule'},
  { path: 'profile', canActivate: [AuthGuard], loadChildren: './core/_auth/profile/profile.module#ProfileModule'},
  { path: 'main', canActivate: [AuthGuard], loadChildren: './core/pages/main/main.module#MainModule'},
  { path: 'register',canActivate: [SessionLessGuard], loadChildren: './core/_auth/register/register.module#RegisterModule'},
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
