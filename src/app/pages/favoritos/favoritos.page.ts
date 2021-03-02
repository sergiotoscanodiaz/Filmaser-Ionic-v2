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
    private serieService: SerieService,
    private alert: AlertController,
    private db: AngularFirestore,
    private authService: AuthService) {
      this.authService.getCurrentUser().subscribe(
        () => this.favoritos = serieService.getFavoritos(),
      );
  }

  ngOnInit() {}

}
