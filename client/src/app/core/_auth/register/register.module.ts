import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompareDirective } from '../directives/compare-password.directive';
import { UserService } from '../../services';



@NgModule({
  declarations: [RegisterComponent,CompareDirective],
  exports: [CompareDirective],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule        
  ],
  providers: [UserService]
})
export class RegisterModule { }
