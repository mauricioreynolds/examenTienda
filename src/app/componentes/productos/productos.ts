import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DbService } from '../../servicios/db.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html'
})
export class Productos implements OnInit {
  listaProds: any[] = [];
  listaCats: any[] = [];
  prod = { id: null as number | null, nombre: '', precio: 0, idCat: '' };

  constructor(private db: DbService) {}

  async ngOnInit() {
    await this.cargarTodo();
  }

  async cargarTodo() {
    this.listaProds = await this.db.listar('productos');
    this.listaCats = await this.db.listar('categorias');
  }

  // Simulación de relación 1:N [cite: 39]
  obtenerCat(id: any) {
    const c = this.listaCats.find(x => x.id == id);
    return c ? c.nombre : 'Sin Categoría';
  }

  async guardar() {
    if (!this.prod.nombre || !this.prod.idCat) return;
    await this.db.guardar('productos', { ...this.prod });
    this.prod = { id: null, nombre: '', precio: 0, idCat: '' };
    await this.cargarTodo();
  }

  editar(p: any) { this.prod = { ...p }; }

  async eliminar(id: number) {
    await this.db.borrar('productos', id);
    await this.cargarTodo();
  }
}