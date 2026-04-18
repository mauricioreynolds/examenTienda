import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  prod: any = {
    id: null,
    nombre: '',
    precio: 0,
    stock: 0,
    idCat: null
  };

  constructor(private db: DbService, private cd: ChangeDetectorRef) {}

  async ngOnInit() {
    await this.db.iniciar();
    await this.cargarTodo();
  }

  async cargarTodo() {
    this.listaProds = await this.db.listar('productos');
    this.listaCats = await this.db.listar('categorias');
    this.cd.detectChanges();
  }

  obtenerNombreCat(id: any) {
    const cat = this.listaCats.find(c => c.id == id);
    return cat ? cat.nombre : 'Sin categoría';
  }

  async guardar() {
    if (!this.prod.nombre || !this.prod.idCat) return;

    await this.db.guardar('productos', { ...this.prod });

    this.limpiar();
    await this.cargarTodo();
    this.cd.detectChanges();
  }

  editar(p: any) {
    this.prod = { ...p };
  }

  async eliminar(id: number) {
    await this.db.borrar('productos', id);
    await this.cargarTodo();
    this.cd.detectChanges();
  }

  limpiar() {
    this.prod = { id: null, nombre: '', precio: 0, stock: 0, idCat: null };
  }
}