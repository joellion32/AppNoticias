import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
// variables para almacenar las noticias
noticias: Article[] = [];

  constructor(http: HttpClient, private storage: Storage) {
    this.cargarFavoritos();
  }


// para guardar las noticias
guardarNoticias(noticia: Article) {
// poner cada noticia al principio del arreglo
this.noticias.unshift(noticia);
// guardar noticias en el local storage
this.storage.set('favoritos', this.noticias);
}

// cargar las noticias
async cargarFavoritos() {
const favoritos = await this.storage.get('favoritos');

if ( favoritos) {
this.noticias = favoritos;
} else {
this.noticias = [];
}

}

// borrar noticias
borrarNoticias(noticia: Article) {
this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
this.storage.set('favoritos', this.noticias);
}


}// cierre de la clase
