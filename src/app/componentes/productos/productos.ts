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
  
  prod = { 
    id: null as number | null, 
    nombre: '', 
    precio: 0, 
    stock: 0, 
    idCat: '' 
  };

  constructor(private db: DbService) {}

async ngOnInit() {
  await this.db.iniciar(); 
  await this.cargarTodo(); 
}

async cargarTodo() {
  this.listaProds = await this.db.listar('productos');
  this.listaCats = await this.db.listar('categorias');
}

  obtenerNombreCat(id: any) {
    const cat = this.listaCats.find(c => c.id == id);
    return cat ? cat.nombre : 'Sin categoría';
  }

  async guardar() {
    if (!this.prod.nombre || !this.prod.idCat) {
      //alert('Completa el nombre y la categoría');
      return;
    }
    await this.db.guardar('productos', { ...this.prod });
    this.limpiar();
    await this.cargarTodo();
  }

  editar(p: any) {
    this.prod = { ...p };
  }

  async eliminar(id: number) {
    if (confirm('¿Borrar producto?')) {
      await this.db.borrar('productos', id);
      await this.cargarTodo();
    }
  }

  limpiar() {
    this.prod = { id: null, nombre: '', precio: 0, stock: 0, idCat: '' };
  }
}