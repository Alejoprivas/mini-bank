import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { shareReplay, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  contextUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  public selectedCuenta;

  getAccounts(): Observable<any> {
    return this.http.get<any>(this.contextUrl + '/accounts')
      .pipe(
        map(account => account)
      );
  }

}
