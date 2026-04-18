import { Routes } from '@angular/router';
import { Inicio } from './componentes/inicio/inicio'; 
import { Productos } from './componentes/productos/productos';
import { Categorias } from './componentes/categorias/categorias';
import { Clientes } from './componentes/clientes/clientes';

export const routes: Routes = [
  { path: 'inicio', component: Inicio },
  { path: 'productos', component: Productos },
  { path: 'categorias', component: Categorias },
  { path: 'clientes', component: Clientes },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' } 
];