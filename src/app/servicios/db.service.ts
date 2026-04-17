import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private db: any;

  iniciar() {
    const request = indexedDB.open('bd_tienda', 1);

    request.onupgradeneeded = (e: any) => {
      this.db = e.target.result;

      this.db.createObjectStore('categorias', { keyPath: 'id', autoIncrement: true });
      this.db.createObjectStore('productos', { keyPath: 'id', autoIncrement: true });
      this.db.createObjectStore('clientes', { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = (e: any) => {
      this.db = e.target.result;
    };
  }

  obtenerDB() {
    return this.db;
  }
}