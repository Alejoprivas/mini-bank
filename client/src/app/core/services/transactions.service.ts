import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }
  contextUrl: string = environment.apiUrl + '/transaction';
  deposit(accountId, amount): Observable<any> {
    return this.http.post<any>(`${this.contextUrl}/makeDeposit`, {
      accountNumber: accountId,
      depositAmount: amount
    })
      .pipe(map(data => data));;
  }
  withdraw(accountId, amount): Observable<any> {
    return this.http.post<any>(`${this.contextUrl}/makeWithdrawal`, {
      accountNumber: accountId,
      withdrawalAmount: amount
    })
      .pipe(map(data => data));;
  }
  transfer(source, rut, destination, amount): Observable<any> {
    return this.http.post<any>(`${this.contextUrl}/transferMoney`, {
      sourceAccount: source,
      rutDestination: rut,
      destinationAccount: destination,
      transferAmount: amount
    })
      .pipe(map(data => data));;
  }
}
