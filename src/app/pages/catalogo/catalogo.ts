import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ProdutoService } from '../../core/services/produto';
import { CategoriaService } from '../../core/services/categoria';
import { Categoria, Produto } from '../../core/models/produto.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { NotificacaoService } from '../../core/services/notificacao';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-catalogo',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule
],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo implements OnInit{

  private produtoService = inject(ProdutoService);
  private categoriaService = inject(CategoriaService);

  produtos = signal<Produto[]>([]);
  categorias = signal<Categoria[]>([]);
  carregando = signal(true);
  categoriaSelecionada = '';
  termoBusca = '';
  erro = signal('');

  ngOnInit() {
    this.carregarProdutos();
    this.carregarCategorias();
  }

  carregarProdutos() {
    this.carregando.set(true);

    this.produtoService.listar().subscribe({
      next: (dados) => {
        this.produtos.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Erro ao carregar produtos');
        this.carregando.set(false);
      }
    });
  }

  carregarCategorias() {
    this.categoriaService.listar().subscribe({
      next: (dados) => {
        this.categorias.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Erro ao carregar categorias');
        this.carregando.set(false);
      }
    });
  }

  buscar() {
    if (this.termoBusca) {
      this.produtoService.filtrar(this.termoBusca).subscribe({
        next: (dados) => {
          this.produtos.set(dados.content);
        }
      });
    } else {
      this.produtoService.listar().subscribe({
        next: (dados) => {
          this.produtos.set(dados);
        }
      });
    }
  }

  filtrarPorCategoria() {
    if (this.categoriaSelecionada) {
      this.produtoService.listarPorCategoria(this.categoriaSelecionada).subscribe({
        next: (dados) => {
          this.produtos.set(dados);
        }
      });
    } else {
      this.carregarProdutos();
    }
  }

  limparBusca() {
    this.termoBusca = '';
    this.carregarProdutos();
  }

}
