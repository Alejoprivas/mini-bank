import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account/account';
import { TransactionsService } from 'src/app/core/services/transactions.service';
@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.sass']
})
export class DepositoComponent implements OnInit {
  selectedCuenta: null;
  depositAmount: 0;
  comprobante = null;
  constructor(public transactionService: TransactionsService) {
  }
  getSelectedCuenta(cuenta) {
    this.selectedCuenta = cuenta;
  }
  depositMoney() {
    this.transactionService.deposit(this.selectedCuenta,this.depositAmount).subscribe(Response=>{
      if(Response.data.state=='done'){
        this.comprobante = Response.data;
        console.log(this.comprobante)
      }
    })
      
  }
  ngOnInit() {
  }

}
