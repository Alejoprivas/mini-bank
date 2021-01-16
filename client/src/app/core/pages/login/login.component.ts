import { Component } from '@angular/core';
import { User } from 'src/app/models/user/';
import { NgForm } from '@angular/forms';
import { SHA3 } from 'sha3';
import { Router } from '@angular/router';
import { store } from 'src/app/core/_auth/current-user';
import { SecurityService } from 'src/app/core/_auth/services/security.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    user: User = new User(null, null, null, null);
    showError: boolean;
    remember: boolean;
    constructor(
        private securityService: SecurityService,
        private router: Router
    ) {}
    login(form: NgForm) {
        if (form.valid) {
            const hash = new SHA3(512);
            hash.update(this.user.password);
            const sha3pass = hash.digest('hex');
            this.securityService.login(this.user.username, sha3pass, this.remember === undefined ? false : this.remember)
            .subscribe(
                user => {
                    this.showError = false;
                    this.router.navigate(['/main']);
                    this.setUser(user);
                },
                err => this.showError = true
            );
        }
    }
    private setUser(user: User) {
        store.setUser(user);
    }
}
