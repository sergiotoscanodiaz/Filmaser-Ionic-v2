import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Serie } from 'src/app/model/serie';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  generos: string[] = [];
  generosAux: string[] = [];
  favoritos: Serie[] = [];

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private db: AngularFirestore) 
    {
      this.getSeries().subscribe(
        data => {
          data.forEach(f => {
            f.generos.forEach(e => {
              this.generosAux.push(e);
            });
            f.esFav = false;
          });
          this.generosAux.forEach(g => {
            if (!this.generos.includes(g)) {
              this.generos.push(g);
            }
          });
        }
      );
      /*this.getFavoritos().then(
        data => this.favoritos = data == null ? [] : data
      );*/
  }

  getGeneros(): string[] {
    return this.generos;
  }

  getSeries(): Observable<any> {
    return this.httpClient.get('assets/data.json');
  }

  getFavoritos(): Observable<Serie[]>{
    //return this.storage.get('favoritos');
    //return this.db.collection<Serie>('series').valueChanges();
    return this.db.collection<Serie>('series').snapshotChanges()
        .pipe(
          map(
            snaps => snaps.map(
              snap => <Serie>{
                id: snap.payload.doc.id,
                ...snap.payload.doc.data() as Serie
              }
            )
          )
        );
  }

  addToFavoritos(serie: Serie): Promise<DocumentReference> {
    serie.esFav = true;
    this.favoritos.push(serie);
    //return this.storage.set('favoritos', this.favoritos);
    return this.db.collection<Serie>('series').add(serie);
  }

  /*deleteFromFavoritos(serie: Serie) {
    serie.esFav = false;
    this.favoritos = this.favoritos.filter(f => f.id != serie.id);
    return this.storage.set('favoritos', this.favoritos);
  }*/

  public deleteSerieById(id: string): Promise<void>{
    return this.db.collection('series').doc(id).delete();
  }
}
