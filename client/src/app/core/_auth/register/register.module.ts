import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompareDirective } from '../directives/compare-password.directive';
import { UserService } from '../../services';
import { RutValidateDirective } from '../directives/rut-validate.directive';
import { RutlimitDirective } from '../directives/rut-limit.directive';



@NgModule({
  declarations: [RegisterComponent,CompareDirective,RutValidateDirective,RutlimitDirective],
  exports: [CompareDirective,RutValidateDirective],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule        
  ],
  providers: [UserService]
})
export class RegisterModule { }
