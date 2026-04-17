import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DbService } from '../../servicios/db.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.html'
})
export class Clientes implements OnInit {
  lista: any[] = [];
  cliente = { id: null as number | null, nombre: '', nit: '', celular: '' };

  constructor(private db: DbService) {}

async ngOnInit() {
  await this.db.iniciar();
  await this.cargar();
}

async cargar() {
  this.lista = await this.db.listar('clientes');
}

  async guardar() {
    if (!this.cliente.nombre) return;
    await this.db.guardar('clientes', { ...this.cliente });
    this.cliente = { id: null, nombre: '', nit: '', celular: '' };
    await this.cargar();
  }

  editar(c: any) { this.cliente = { ...c }; }

  async eliminar(id: number) {
    if (confirm('¿Eliminar cliente?')) {
      await this.db.borrar('clientes', id);
      await this.cargar();
    }
  }
}