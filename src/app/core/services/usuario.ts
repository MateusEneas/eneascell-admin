import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080';

  listar() {
    return this.http.get<Usuario[]>(`${this.apiUrl}/user/`);
  }

  criar(usuario: Partial<Usuario> & { senha: string }) {
    return this.http.post<Usuario>(`${this.apiUrl}/user/`, usuario);
  }

  atualizar(id: string, usuario: Partial<Usuario> & { senha?: string }) {
    return this.http.patch<Usuario>(`${this.apiUrl}/user/${id}`, usuario);
  }

  deletar(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/user/${id}`);
  }


}
