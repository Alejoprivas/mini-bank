import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/_auth/authentication.service';
import { store } from 'src/app/core/_auth/current-user';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  user: User;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
      this.authenticationService.getUser().subscribe(user => this.user = user, err => this.user = null);
      store.currentUser$.subscribe(user => this.user = user);
  }
}
