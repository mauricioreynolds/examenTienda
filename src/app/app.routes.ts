import { Routes } from '@angular/router';
import { Productos } from './componentes/productos/productos';
import { Categorias } from './componentes/categorias/categorias';
import { Clientes } from './componentes/clientes/clientes';

export const routes: Routes = [
  { path: 'productos', component: Productos },
  { path: 'categorias', component: Categorias },
  { path: 'clientes', component: Clientes },
  { path: '', redirectTo: 'productos', pathMatch: 'full' }
];