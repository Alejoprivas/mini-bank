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
  contextUrl: string = environment.apiUrl + '/transactions';
  deposit(accountId, amount): Observable<any> {
    return this.http.post<any>(`${this.contextUrl}/deposit`, {
      accountId,
      amount
    })
      .pipe(map(data => data));;
  }
  withdraw(accountId, amount): Observable<any> {
    return this.http.post<any>(`${this.contextUrl}/withdraw`, {
      accountId,
      amount
    })
      .pipe(map(data => data));;
  }
  transfer(source, destination, amount): Observable<any> {
    return this.http.post<any>(`${this.contextUrl}/transfer`, {
      source,
      destination,
      amount
    })
      .pipe(map(data => data));;
  }
}
