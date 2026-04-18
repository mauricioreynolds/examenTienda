import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DbService } from '../../servicios/db.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.html'
})
export class Categorias implements OnInit {

  lista: any[] = [];
  nombre: string = '';
  idEditando: number | null = null;

  constructor(private dbServicio: DbService, private cd: ChangeDetectorRef) {}

  async ngOnInit() {
    await this.dbServicio.iniciar();
    await this.cargar();
  }

  async cargar() {
    this.lista = await this.dbServicio.listar('categorias');
    this.cd.detectChanges(); 
  }

  async guardar() {
    if (!this.nombre) return;

    const obj = this.idEditando
      ? { id: this.idEditando, nombre: this.nombre }
      : { nombre: this.nombre };

    await this.dbServicio.guardar('categorias', obj);

    this.nombre = '';
    this.idEditando = null;

    await this.cargar();
    this.cd.detectChanges(); 
  }

  prepararEdit(c: any) {
    this.nombre = c.nombre;
    this.idEditando = c.id;
  }

  async eliminar(id: number) {
    if (confirm('¿Desea borrar esta categoria?')) {
      await this.dbServicio.borrar('categorias', id);
      await this.cargar();
      this.cd.detectChanges(); 
    }
  }
}