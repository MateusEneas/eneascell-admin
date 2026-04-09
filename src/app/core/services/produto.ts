import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080';

  listar() {
    return this.http.get<Produto[]>(`${this.apiUrl}/produto/`);
  }

   buscarPorId(id: string) {
    return this.http.get<Produto>(`${this.apiUrl}/produto/${id}`);
  }

  criar(produto: Partial<Produto>) {
    return this.http.post<Produto>(`${this.apiUrl}/produto/`, produto);
  }

  atualizar(id: string, produto: Partial<Produto>) {
    return this.http.patch<Produto>(`${this.apiUrl}/produto/${id}`, produto);
  }

  deletar(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/produto/${id}`);
  }

}
