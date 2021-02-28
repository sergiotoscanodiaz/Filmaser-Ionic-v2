import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  spinner: boolean = false;
  email: string;
  password: string;
  passwordType: string = 'password';
  passwordShown: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async login() {
    this.spinner = true;
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigateByUrl('/home');
      this.spinner = true;
    } catch (error) {
      console.log(error);
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Conexión fallida',
      subHeader: 'No se ha podido acceder a la cuenta.',
      message: 'El correo electrónico y la contraseña proporcionados no son válidos.',
      buttons: ['Aceptar']
    });

    await alert.present();
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

}
