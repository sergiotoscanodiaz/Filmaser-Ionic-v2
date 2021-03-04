import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  inputNombre: string;
  dato: string = 'nombre de usuario';

  constructor(private storage: Storage) { }

  ngOnInit() {
  }

  guardar(){
    this.storage.set(this.dato, this.inputNombre);
  }

  cargar(){
    this.storage.get(this.dato).then((dato) => {
        this.dato = dato;
        console.log('Tu nombre de usuario es: ' + dato);    
    });
  }

  borrar(){
    this.storage.clear();
  }

}
