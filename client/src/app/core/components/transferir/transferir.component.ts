import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  
  transferForm: TransferForm = new TransferForm(null,null,null,null);
  selectedCuenta: null;
  depositAmount: 0;
  constructor() { }

  ngOnInit() {
  }

  getSelectedCuenta(cuenta) {
    this.selectedCuenta = cuenta;
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
    console.log('Cuenta destino', this.transferForm);
    console.log('Cuenta origen', this.selectedCuenta)
  }
}
