import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DbService } from '../../servicios/db.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categorias.html'
})
export class Categorias implements OnInit {

  nombre: string = '';
  lista: any[] = [];

  constructor(private dbServicio: DbService) {}

  ngOnInit() {
    this.cargar();
  }

  guardar() {
    const db = this.dbServicio.obtenerDB();

    db.transaction('categorias', 'readwrite')
      .objectStore('categorias')
      .add({ nombre: this.nombre });

    this.nombre = '';
    this.cargar();
  }

  cargar() {
    const db = this.dbServicio.obtenerDB();

    const req = db.transaction('categorias')
      .objectStore('categorias')
      .getAll();

    req.onsuccess = () => {
      this.lista = req.result;
    };
  }

  eliminar(id: number) {
    const db = this.dbServicio.obtenerDB();

    db.transaction('categorias', 'readwrite')
      .objectStore('categorias')
      .delete(id);

    this.cargar();
  }
}