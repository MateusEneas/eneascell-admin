import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Categoria } from '../models/produto.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080';

  listar() {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categories/`);
  }

  buscarPorId(id: string) {
    return this.http.get<Categoria>(`${this.apiUrl}/categories/${id}`)
  }

  criar(categoria: Partial<Categoria>) {
    return this.http.post<Categoria>(`${this.apiUrl}/categories/`, categoria);
  }

  atualizar(id: string, categoria: Partial<Categoria>) {
      return this.http.patch<Categoria>(`${this.apiUrl}/categories/${id}`, categoria);
    }

    deletar(id: string) {
      return this.http.delete<void>(`${this.apiUrl}/categories/${id}`);
    }

}
