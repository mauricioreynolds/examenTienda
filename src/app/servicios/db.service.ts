import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private bd: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  iniciar(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!isPlatformBrowser(this.platformId)) {
        resolve();
        return;
      }

      if (this.bd) {
        resolve();
        return;
      }

      const solicitud = indexedDB.open('TiendaBD', 1);

      solicitud.onupgradeneeded = (e: any) => {
        const db = e.target.result;

        if (!db.objectStoreNames.contains('categorias')) {
          db.createObjectStore('categorias', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('productos')) {
          db.createObjectStore('productos', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('clientes')) {
          db.createObjectStore('clientes', { keyPath: 'id', autoIncrement: true });
        }
      };

      solicitud.onsuccess = (e: any) => {
        this.bd = e.target.result;
        resolve();
      };

      solicitud.onerror = (e) => reject(e);
    });
  }

  async listar(tabla: string): Promise<any[]> {
    if (!this.bd) await this.iniciar();
    if (!this.bd) return [];

    const tx = this.bd.transaction([tabla], 'readonly');
    const store = tx.objectStore(tabla);

    return new Promise((res) => {
      const req = store.getAll();
      req.onsuccess = () => res(req.result);
    });
  }

  async guardar(tabla: string, datos: any): Promise<void> {
    if (!this.bd) await this.iniciar();

    const tx = this.bd.transaction([tabla], 'readwrite');
    const store = tx.objectStore(tabla);

    if (datos.id) {
      store.put(datos);
    } else {
      delete datos.id;
      store.add(datos);
    }

    return new Promise((res) => (tx.oncomplete = () => res()));
  }

  async borrar(tabla: string, id: number): Promise<void> {
    if (!this.bd) await this.iniciar();

    const tx = this.bd.transaction([tabla], 'readwrite');
    const store = tx.objectStore(tabla);
    store.delete(id);

    return new Promise((res) => (tx.oncomplete = () => res()));
  }
}