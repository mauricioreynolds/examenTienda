import { Routes } from '@angular/router';
import { Inicio } from './componentes/inicio/inicio'; // <--- Importamos el nuevo
import { Productos } from './componentes/productos/productos';
import { Categorias } from './componentes/categorias/categorias';
import { Clientes } from './componentes/clientes/clientes';

export const routes: Routes = [
  { path: 'inicio', component: Inicio },
  { path: 'productos', component: Productos },
  { path: 'categorias', component: Categorias },
  { path: 'clientes', component: Clientes },
  // Esto hace que al abrir la web, entre directo a Inicio
  { path: '', redirectTo: 'inicio', pathMatch: 'full' } 
];