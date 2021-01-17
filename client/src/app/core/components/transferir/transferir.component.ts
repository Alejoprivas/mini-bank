import { Component, OnInit } from '@angular/core';

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

  selectedCuenta: null;
  depositAmount: 0;
  constructor() { }

  ngOnInit() {
  }

  getSelectedCuenta(cuenta) {
    this.selectedCuenta = cuenta;
  }
  
  getEndCuenta() {
  }

  transferMoney() {

  }
}
