
// Import Libraries
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { SHA3 } from 'sha3';

// Security
import { SecurityService } from '../services/security.service';
import { AuthenticationService } from '../authentication.service';
import { User } from '../../../models/user/';
import { AlertService, UserService } from '../../services/';
import { store } from '../current-user';

/**
 * Edit my profile
 */
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

    user: User;
    passwordOld: string;
    passwordNew: string;
    passwordNewConfirm: string;
    showError: boolean;
    @ViewChild('closeModal', { static: true }) closeModal: ElementRef;

    constructor(
        private alertService: AlertService,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private securityService: SecurityService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            // Get logged user
            this.authenticationService.getUser().subscribe(user => {console.log(user);this.user = user});
        });
    }

    /**
     * Save User
     *
     * @param {boolean} valid Form validity
     */
    save(valid: boolean) {
        if (valid)
            this.userService.update(this.user).subscribe(data => {
                this.userService.getById(this.user._id).subscribe(user => {
                    store.setUser(user);
                    this.alertService.success("Se modificaron los datos exitosamente",true);
                    this.router.navigateByUrl('/main');

                });
            });
    }

    /**
     * Change password of user
     */
    changePassword() {
        this.showError = false;

        // Convert passwords in SHA-3
        const hashNewPwd = new SHA3(512);
        hashNewPwd.update(this.passwordNew);
        const passwordNew = hashNewPwd.digest('hex');

        const hash = new SHA3(512);
        hash.update(this.passwordOld);
        const passwordOld = hash.digest('hex');

        // Change password
        this.securityService.changePassword({email: this.user.email,passwordNew: passwordNew, passwordOld: passwordOld}).subscribe(data => {
            this.passwordOld = null;
            this.passwordNew = '';
            this.passwordNewConfirm = '';
            this.showError = false;
            this.closeModal.nativeElement.click();
        }, err => {
            this.showError = true;
        });
    }
}

