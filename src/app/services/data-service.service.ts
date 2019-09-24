import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Noticias } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }
// variables
  url = 'https://newsapi.org/v2';
  apikey = 'c70f8c45b89c4ec0a4624ed2c570eba2';
  noPagina = 0;
  noCategoria = 0;
  categoriaActual = '';
  NoticasTecnologia() {
   const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
      // tslint:disable-next-line:max-line-length
   return this.http.get<Noticias>(this.url + '/top-headlines?country=mx&category=technology&apiKey=' + this.apikey + '&page=' + this.noPagina++, {headers});
  }

  NoticiasCategorias(categoria: string) {
    if (this.categoriaActual === categoria) {
     this.noCategoria++;
    } else {
      this.noCategoria = 1;
      this.categoriaActual = categoria;
    }

    const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
    // tslint:disable-next-line:max-line-length
    return this.http.get<Noticias>(this.url + '/top-headlines?country=mx&category=' + categoria + '&apiKey=' + this.apikey + '&page=' + this.noCategoria, {headers});

  }
}
