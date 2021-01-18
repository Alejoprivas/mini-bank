import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompareDirective } from '../directives/compare-password.directive';
import { UserService } from '../../services';
import { DirectivesModule } from 'src/app/directives.module';


@NgModule({
  declarations: [RegisterComponent,CompareDirective],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    DirectivesModule
  ],
  providers: [UserService]
})
export class RegisterModule { }
