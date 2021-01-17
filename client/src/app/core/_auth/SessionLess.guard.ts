import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from './authentication.service';
//import { LoginService } from '@apps/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class SessionLessGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    //private loginService: LoginService,
  ) { }

  public canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let isSessionLess=false;
    this.authenticationService.getUser().subscribe(
      Response=>{
        if(!Response){
          isSessionLess = true;//!this.loginService.isAuthenticated;
        }
      }      
    );
    const navigationExtras = this.router.getCurrentNavigation().extras.state;
    console.log(state.url, navigationExtras)
    if (isSessionLess) { return true; }
    this.router.navigateByUrl(`/main`, { state: navigationExtras });
    return false;
  }
}