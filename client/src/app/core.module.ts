import { NgModule } from '@angular/core';

import { UserService, AlertService } from './core/services'
import { AuthGuard } from './core/_auth/auth.guard';
import { AuthenticationService } from './core/_auth/authentication.service';
import { SecurityService } from './core/_auth/services/security.service';
import { HTTP_INTERCEPTORS } from '../../node_modules/@angular/common/http';
import { AuthInterceptor } from './core/_auth/auth.interceptor';

@NgModule({
  imports: [],
  providers: [
    AlertService,
    UserService,
    AuthGuard,
    AuthenticationService,
    SecurityService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule {
}
