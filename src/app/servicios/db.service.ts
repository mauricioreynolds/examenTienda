import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private bd: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  iniciar(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!isPlatformBrowser(this.platformId)) {
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
    if (!this.bd) return [];
    const tx = this.bd.transaction([tabla], 'readonly');
    const almacen = tx.objectStore(tabla);
    return new Promise((res) => {
      const solicitud = almacen.getAll();
      solicitud.onsuccess = () => res(solicitud.result);
    });
  }

  async guardar(tabla: string, datos: any): Promise<void> {
    if (!this.bd) return;
    const tx = this.bd.transaction([tabla], 'readwrite');
    const almacen = tx.objectStore(tabla);
    
    // Si tiene ID mayor a 0, es una actualización (put), si no, es nuevo (add)
    if (datos.id) {
      almacen.put(datos);
    } else {
      delete datos.id; // Nos aseguramos de que IndexedDB genere el ID
      almacen.add(datos);
    }
    return new Promise((res) => tx.oncomplete = () => res());
  }

  async borrar(tabla: string, id: number): Promise<void> {
    if (!this.bd) return;
    const tx = this.bd.transaction([tabla], 'readwrite');
    const almacen = tx.objectStore(tabla);
    almacen.delete(id);
    return new Promise((res) => tx.oncomplete = () => res());
  }
}