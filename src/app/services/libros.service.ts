import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Libro } from '../models/libros'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  [x: string]: any;

  

  API_URI = 'https://blushing-gold-wrap.cyclic.app/libros';

  constructor(private http: HttpClient) { }

  getLibrosConDetalles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URI}/detalles`);
  }

  ejecutarConsulta(query: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.API_URI}/consulta`, {query});
  }

  getLibros(){
    return this.http.get(`${this.API_URI}`);
  }

  getLibro(id: string) {
    return this.http.get(`${this.API_URI}/${id}`);
  }

  deleteLibro(id: string) {
    return this.http.delete(`${this.API_URI}/${id}`);
  }

  saveLibro(libro: Libro){
    return this.http.post(`${this.API_URI}`, libro);
  }

}

export interface LibrosService {
  getLibros(): Observable<any>;
  ejecutarConsulta(query: string): Observable<any>;
}
