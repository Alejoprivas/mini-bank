import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.sass']
})
export class RetiroComponent implements OnInit {
  comprobante = null;
  selectedCuenta: any;
  depositAmount = 0;
  constructor(public transactionService: TransactionsService) { }

  ngOnInit() {
  }
  
  getSelectedCuenta(cuenta) {
    this.selectedCuenta = cuenta;
  }
  retirarMoney() {
    this.transactionService.withdraw(this.selectedCuenta,this.depositAmount).subscribe(Response=>{
      if(Response.data.state=='done'){
        this.comprobante = Response.data;
        console.log(this.comprobante)
      }
    })
      
  }
}
