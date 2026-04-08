import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './shared/components/layout/layout';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    component: Layout,
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
        path: '',
        redirectTo: 'produtos',
        pathMatch: 'full'
      }
    ]
  }
];
