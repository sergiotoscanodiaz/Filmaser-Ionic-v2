import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SerieService } from '../service/serie.service';
import { Serie } from '../model/serie';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  series: Serie[];
  generos: string[];
  buscarGenero: string;
  clicked: boolean;
  index: number;

  constructor(private service: SerieService) {
      this.generos = this.service.getGeneros();
      this.getData();
      this.buscarGenero = "todos";
      this.clicked = false;
      this.index = 0;
  }

  getData() {
    this.service.getSeries().subscribe(
      data => {
        this.series = data;
      }
    );
  }

  showDetails(id: number) {
    let aux = this.series.findIndex(s => s.id == id);
    this.clicked = !this.clicked;
    if (aux != this.index) {
      this.index = this.series.findIndex(s => s.id == id);
      this.clicked = !this.clicked;
    }
  }

  addToFavoritos(serie: Serie) {
    this.service.addToFavoritos(serie)
    .catch(error => console.error(error));
  }

}
