import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './shared/components/layout/layout';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./pages/catalogo/catalogo').then(m => m.Catalogo)
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: 'produtos',
        loadComponent: () => import('./pages/produtos/produtos').then(m => m.Produtos)
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./pages/usuarios/usuarios').then(m => m.Usuarios)
      },
      {
        path: 'categorias',
        loadComponent: () => import('./pages/categorias/categorias').then(m => m.Categorias)
      },
      {
        path: '',
        redirectTo: 'produtos',
        pathMatch: 'full'
      }
    ]
  }
];
