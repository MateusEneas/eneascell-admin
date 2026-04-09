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

}
