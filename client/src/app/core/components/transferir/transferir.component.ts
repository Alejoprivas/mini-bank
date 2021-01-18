import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionsService } from '../../services/transactions.service';

class TransferForm {

  public orCuenta?: string;
  public dstRut?: string;
  public dstCuenta?: string;
  public monto?: string;
  constructor(
    orCuenta?: string,
    dstRut?: string,
    dstCuenta?: string,
    monto?: string,
    ) {
      this.orCuenta = orCuenta;
      this.dstRut = dstRut;
      this.dstCuenta = dstCuenta;
      this.monto = monto;
  }
}
@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.sass']
})
export class TransferirComponent implements OnInit {
  comprobante=null;
  transferForm: TransferForm = new TransferForm(null,null,null,null);
  constructor(private transactionService: TransactionsService,
              private router: Router) { }

  ngOnInit() {
  }

  getSelectedCuenta(cuenta) {
    this.transferForm.orCuenta = cuenta._id;
  }
  

  onBlur(){
    let v = this.transferForm.dstRut?this.transferForm.dstRut.slice(-1):false;
    if(v){
      let valor = this.transferForm.dstRut.replace(/\./g,'');
      console.log(this.transferForm.dstRut.replace(/\./g,''))  
    
      valor = valor.replace(/-/g,'');
      this.transferForm.dstRut = valor.slice(0,valor.length-1) + '-' + v
    };
  }

  transferMoney(form: NgForm) {
    //console.log(form);
    if(form.valid){
      let trsData = form.value;
      console.log(this.transferForm);
      
      this.transactionService.transfer(this.transferForm.orCuenta,this.transferForm.dstRut,this.transferForm.dstCuenta,this.transferForm.monto).subscribe(Response=>{
        //this.router.navigate(['/main']);ç
        if(Response.data.state=='done'){
          this.comprobante = Response.data;
        }
      })
      //*/
    } 
    //console.log('Cuenta destino', this.transferForm);
    //console.log('Cuenta origen', this.selectedCuenta)
  }
}
