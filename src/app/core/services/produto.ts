import { HttpClient, HttpParams } from '@angular/common/http';
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

  filtrar(nome?: string, precoMin?: number, precoMax?: number) {
    let params = new HttpParams();

    if (nome) params = params.set('nome', nome);
    if (precoMin) params = params.set('precoMin', precoMin);
    if (precoMax) params = params.set('precoMax', precoMax);

    return this.http.get<{ content: Produto[] }>(`${this.apiUrl}/produto/filter`, { params });

  }

  listarPorCategoria(categoriaId: string) {
    return this.http.get<Produto[]>(`${this.apiUrl}/produto/category/${categoriaId}`);
  }

}
