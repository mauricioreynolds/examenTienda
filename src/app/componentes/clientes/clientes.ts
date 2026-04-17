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
  cliente = { id: null as number | null, nombre: '', correo: '' };

  constructor(private dbServicio: DbService) {}

  async ngOnInit() {
    await this.cargar();
  }

  async cargar() {
    this.lista = await this.dbServicio.listar('clientes');
  }

  async guardar() {
    if (!this.cliente.nombre || !this.cliente.correo) return;
    await this.dbServicio.guardar('clientes', { ...this.cliente });
    this.limpiar();
    await this.cargar();
  }

  editar(c: any) {
    this.cliente = { ...c };
  }

  async eliminar(id: number) {
    if (confirm('¿Eliminar este cliente?')) {
      await this.dbServicio.borrar('clientes', id);
      await this.cargar();
    }
  }

  limpiar() {
    this.cliente = { id: null, nombre: '', correo: '' };
  }
}