/* import { Component, OnInit } from '@angular/core';
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
} */

  import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DbService } from '../../servicios/db.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html'
})
export class Inicio implements OnInit {

  prodsTotales = 0;
  catsTotales = 0;
  clisTotales = 0;

  constructor(
    private db: DbService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.db.iniciar();

    await this.cargarDatos();

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(async (e: any) => {
        if (e.urlAfterRedirects === '/inicio' || e.url === '/inicio') {
          await this.cargarDatos();
        }
      });
  }

  async cargarDatos() {
    const [prods, cats, clis] = await Promise.all([
      this.db.listar('productos'),
      this.db.listar('categorias'),
      this.db.listar('clientes')
    ]);

    this.prodsTotales = prods.length;
    this.catsTotales = cats.length;
    this.clisTotales = clis.length;

    this.cd.detectChanges();
  }
}