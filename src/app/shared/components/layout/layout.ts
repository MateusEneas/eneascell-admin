import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthStateService } from '../../../core/services/auth-state';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit{

  private router = inject(Router);
  private authStateService = inject(AuthStateService);

  usuarioLogado = this.authStateService.usuarioLogado;

  ngOnInit() {
    this.authStateService.carregarUsuario();
  }

  logout() {
    localStorage.removeItem('token');
    this.authStateService.limpar();
    this.router.navigate(['/login']);
  }

}
