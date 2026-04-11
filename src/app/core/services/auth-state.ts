import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UsuarioPerfil {
  nome: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080';

  usuarioLogado = signal<string>('');

  carregarUsuario() {
    this.http.get<UsuarioPerfil>(`${this.apiUrl}/user/perfil`)
      .subscribe({
        next: (usuario) => {
          this.usuarioLogado.set(usuario.nome);
        },
        error: () => {
          this.usuarioLogado.set('');
        }
      });
  }

  limpar() {
    this.usuarioLogado.set('');
  }

}
