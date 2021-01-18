import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { BalanceComponent } from '../../components/balance/balance.component';
import { ConsultaComponent } from '../../components/consulta/consulta.component';
import { RetiroComponent } from '../../components/retiro/retiro.component';
import { TransferirComponent } from '../../components/transferir/transferir.component';
import { PrincipalComponent } from '../../components/principal/principal.component';
import { DepositoComponent } from '../../components/deposito/deposito.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RutValidateDirective } from '../../_auth/directives/rut-validate.directive';
import { RutlimitDirective } from '../../_auth/directives/rut-limit.directive';
import { DirectivesModule } from 'src/app/directives.module';
import { ComprobanteComponent } from '../../components/comprobante/comprobante.component';



@NgModule({
  declarations: [MainComponent, 
                 BalanceComponent, 
                 ConsultaComponent, 
                 RetiroComponent, 
                 TransferirComponent, 
                 PrincipalComponent, 
                 DepositoComponent, ComprobanteComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ],

})
export class MainModule { }
