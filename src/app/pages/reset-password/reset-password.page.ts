import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email: string;

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
  }

  resetPassword() {
    this.authService.resetPassword(this.email)
      .then(
        () => {
          this.alertResetPassword();
          this.router.navigateByUrl('/login');
        }
      ).catch(
        () => this.alertError()
      )
  }

  async alertResetPassword() {
    const alert = await this.alertController.create({
      header: 'Recuperación de contraseña',
      message: 'Se te ha enviado un correo electrónico a <strong>' + this.email + '</strong> con un enlace que te permitirá recuperar la contraseña.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async alertError() {
    const alert = await this.alertController.create({
      header: 'Recuperación de contraseña',
      message: 'No se ha podido enviar un correo a <strong>' + this.email + '</strong> para restablecer la contraseña. Inténtalo de nuevo.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}
