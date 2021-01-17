import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account/account';
import { TransactionsService } from 'src/app/core/services/accounts.service'
@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.sass']
})
export class DepositoComponent implements OnInit {
  selectedCuenta: null;
  depositAmount: 0;
  constructor() {
  }
  getSelectedCuenta(cuenta) {
    this.selectedCuenta = cuenta;
  }
  depositMoney() {

  }
  ngOnInit() {
  }

}
