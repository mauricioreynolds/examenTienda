import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DbService } from '../../servicios/db.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html'
})
export class Inicio implements OnInit {
  // Estos números se mostrarán en las tarjetas
  prodsTotales: number = 0;
  catsTotales: number = 0;
  clisTotales: number = 0;

  constructor(private db: DbService) {}

  async ngOnInit() {
    // Primero despertamos la base de datos
    await this.db.iniciar();
    
    // Traemos las listas para contar cuántos registros hay
    const listaP = await this.db.listar('productos');
    const listaC = await this.db.listar('categorias');
    const listaCl = await this.db.listar('clientes');

    this.prodsTotales = listaP.length;
    this.catsTotales = listaC.length;
    this.clisTotales = listaCl.length;
  }
}