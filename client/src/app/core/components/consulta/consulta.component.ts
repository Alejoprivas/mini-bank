import { Component, OnChanges, Input } from '@angular/core';
import { TransactionsService } from 'src/app/core/services/transactions.service';
import { AccountsService } from '../../services/accounts.service'
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.sass']
})
export class ConsultaComponent implements OnChanges {
  @Input() public cuenta: any;
  transactions;
  selectedCuenta;
  constructor(
    private transactionsService: TransactionsService,
    private accountsService: AccountsService
  ) {

  }

  ngOnChanges(changes) {
<<<<<<< HEAD
    console.log(changes);
    if (changes.cuenta.currentValue) {
      this.selectedCuenta = changes.currentValue
      console.log('ass')
      this.transactionsService.transactionHistory(changes.currentValue).subscribe(transaction => {
        this.transactions = transaction;
        console.log(transaction);
=======
    if (changes.cuenta.currentValue) {
      this.selectedCuenta = changes.cuenta.currentValue
      this.transactionsService.transactionHistory(this.selectedCuenta).subscribe(response => {
        this.transactions = response.data;
>>>>>>> 8677d77604dc990ca794086a1e0122428bc75924
      });
    }

    // changes.prop contains the old and the new value...
  }

}
