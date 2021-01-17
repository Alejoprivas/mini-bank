import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SHA3 } from 'sha3';
import { User } from 'src/app/models/user/user';
import { UserService } from '../../services';
import { AuthenticationService } from '../authentication.service';
import { store } from '../current-user';
import { SecurityService } from '../services/security.service';
class RegisterForm {

  public email?: string;
  public rut?: string;
  public password?: string;
  public repassword?: string;
  constructor(
    email?: string,
    rut?: string,
    password?: string,
    repassword?: string
  ) {
    this.email = email;
    this.rut = rut;
    this.password = password;
    this.repassword = repassword;
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerForm: RegisterForm = new RegisterForm(null, null, null);//new User(null, null, null, null);
  showError: boolean;

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private userService: UserService
  ) { }
  ngOnInit() {
  }

  register(form: NgForm) {
    //console.log(form)
    if (form.valid) {
      const hash = new SHA3(512);
      hash.update(this.registerForm.password);
      const sha3pass = hash.digest('hex');
      let user: User = form.value;
      user.password = sha3pass;
      this.userService.register(user).subscribe(response => {
        this.showError = false;
        //this.router.navigate(['/main']);
        this.securityService.login(response.email, user.password, false).subscribe(
          response => {
            //console.log(response);
            this.router.navigate(['/main']);
            // this.setUser(user);

          }
        )

      },
        error => {
          this.showError = true;
        }
      )
      //*/
    }
  }

  onBlur(){
    let v = this.registerForm.rut?this.registerForm.rut.slice(-1):false;
    if(v){
      let valor = this.registerForm.rut.replace(/\./g,'');
      console.log(this.registerForm.rut.replace(/\./g,''))  
    
      valor = valor.replace(/-/g,'');
      this.registerForm.rut = valor.slice(0,valor.length-1) + '-' + v
    };
  }

  private setUser(user: User) {
    store.setUser(user);
  }
  
}
