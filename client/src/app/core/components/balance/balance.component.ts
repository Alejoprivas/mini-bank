import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_auth/authentication.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.sass']
})
export class BalanceComponent implements OnInit {
  balance;
  constructor(private authenticationService: AuthenticationService) 
                { 
                  this.authenticationService.getUser().subscribe(Response=>{
                    this.balance = Response.balance;
                  })
                }

  ngOnInit() {
  }

}
