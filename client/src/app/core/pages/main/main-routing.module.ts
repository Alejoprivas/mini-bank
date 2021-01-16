import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaComponent } from '../../components/consulta/consulta.component';
import { DepositoComponent } from '../../components/deposito/deposito.component';
import { PrincipalComponent } from '../../components/principal/principal.component';
import { RetiroComponent } from '../../components/retiro/retiro.component';
import { TransferirComponent } from '../../components/transferir/transferir.component';
import { AuthGuard } from '../../_auth';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:  [
      { path: '', component: PrincipalComponent },
      { path: 'transferencia', component: TransferirComponent },
      { path: 'deposito', component: DepositoComponent },
      { path: 'retiro', component: RetiroComponent },
      { path: 'consulta', component: ConsultaComponent }
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
