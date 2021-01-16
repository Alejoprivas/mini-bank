import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/_auth/auth.guard';


const routes: Routes = [
  { path: 'home',loadChildren: './core/pages/home/home.module#HomeModule'},//*/,
  { path: 'login', loadChildren: './core/pages/login/login.module#LoginModule'},
  { path: 'profile', loadChildren: './core/_auth/profile/profile.module#ProfileModule'},
  { path: 'main', canActivate: [AuthGuard], loadChildren: './core/pages/main/main.module#MainModule'},
  { path: 'register', loadChildren: './core/_auth/register/register.module#RegisterModule'},
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
