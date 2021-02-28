import { Component, OnInit } from '@angular/core';
import { SerieService } from 'src/app/service/serie.service';
import { Observable } from 'rxjs'
import { Serie } from 'src/app/model/serie';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/service/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  favoritos: Observable<Serie[]>;
  clicked: boolean;
  index: number;
  userId: string;
  series: Serie[];

  constructor(
    private service: SerieService,
    private alert: AlertController,
    private db: AngularFirestore,
    private authService: AuthService) {
      this.authService.getCurrentUser().subscribe(
        () => this.favoritos = service.getFavoritos(),
      );
  }

  ngOnInit() {}

  /*deleteFromFavoritos(serie: Serie) {
    this.service.deleteFromFavoritos(serie).then(
      () => this.service.getFavoritos().then(
        data => this.favoritos = data == null ? [] : data
      )
    );
    this.clicked = !this.clicked;
  }*/

  /*public deleteSerieById(id: string): Promise<void> {
    return this.db.collection('users/' + this.userId + '/series').doc(id).delete();
  }*/

 /* public getSerieById(id: string): Observable<Serie> {
    return this.db.collection('users/' + this.userId + '/series').doc<Serie>(id).valueChanges();
  }*/

  /*async alertDeleteFavorito(id: string, titulo: string) {
    const alert = await this.alert.create({
      header: 'Borrar serie',
      message: `¿Estás seguro que quieres borrar la serie?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Quitar',
          cssClass: 'danger',
          handler: () => {
            this.deleteSerieById(id);
          }
        }
      ]
    });
    await alert.present();
  }*/

}
