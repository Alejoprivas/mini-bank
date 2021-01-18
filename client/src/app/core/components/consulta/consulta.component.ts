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
    console.log(changes);
    if (changes.currentValue) {
      this.selectedCuenta = changes.currentValue
      this.transactionsService.transactionHistory(changes.currentValue).subscribe(transaction => {
        this.transactions = transaction;
        console.log(transaction);
      });
    }

    // changes.prop contains the old and the new value...
  }

}
