import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../../_auth/authentication.service';
import { AccountsService } from '../../services/accounts.service'
@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.sass']
})
export class BalanceComponent implements OnInit {
  cuentas;
  selectedCuenta;
  @Output() public selectCuentaEvent = new EventEmitter<any>();

  constructor(
    private accountService: AccountsService
  ) {
    this.accountService.getAccounts().subscribe(Accounts => {
      this.cuentas = Accounts;
      this.selectedCuenta = Accounts[0];
      this.selectCuentaEvent.emit(this.selectedCuenta);
    });
  }
  public selectAccount(index) {
    this.selectedCuenta = this.cuentas[index];
    this.selectCuentaEvent.emit(this.selectedCuenta);
  }

  ngOnInit() {
  }

}
