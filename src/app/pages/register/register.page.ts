import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  spinner: boolean = false;
  passwordType: string = 'password';
  passwordShown: boolean = false;
  email: string;
  password: string;
  password2: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  togglePassword() {
    if(this.passwordShown) {
      this.passwordShown=false;
      this.passwordType = 'password';
    } else {
      this.passwordShown=true;
      this.passwordType = 'text';

    }
  }

  createUser() {
    this.spinner = true;
    this.authService.createUser(this.email, this.password)
        .then(() => this.router.navigateByUrl('/home'));
  }

}
