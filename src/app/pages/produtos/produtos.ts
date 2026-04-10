import { ProdutoService } from './../../core/services/produto';
import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Produto } from '../../core/models/produto.model';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoDialog } from '../../shared/components/produto-dialog/produto-dialog';
import { NotificacaoService } from '../../core/services/notificacao';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-produtos',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CurrencyPipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
],
  templateUrl: './produtos.html',
  styleUrl: './produtos.scss',
})
export class Produtos implements OnInit{

  private produtoService = inject(ProdutoService);
  private dialog = inject(MatDialog);
  private notificacaoService = inject(NotificacaoService);

  produtos = signal<Produto[]>([]);
  carregando = signal(true);
  erro = signal('');
  termoBusca = '';

  colunas = ['nome', 'preco', 'quantidade', 'acoes'];

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.carregando.set(true);

    this.produtoService.listar().subscribe({
      next: (dados) => {
        this.produtos.set(dados);
        this.carregando.set(false);
      },
      error: (err) => {
        console.log('Erro completo:', err);
        this.erro.set('ro ao carregar produtos');
        this.carregando.set(false);
      }
    });
  }

  abrirDialogNovo() {
    const dialogRef = this.dialog.open(ProdutoDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.produtoService.criar(resultado).subscribe({
          next: () => {
            this.carregarProdutos();
            this.notificacaoService.sucesso('Produto criado com sucesso!');
          },
          error: (err) => {
            this.notificacaoService.erro('Erro ao criar produto!');
          }
        });
      }
    });
  }

  abrirDialogEditar(produto: Produto) {
    const dialogRef = this.dialog.open(ProdutoDialog, {
      width: '500px',
      data: produto
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.produtoService.atualizar(produto.id, resultado).subscribe({
          next: () => {
            this.carregarProdutos();
            this.notificacaoService.sucesso('Produto atualizado com sucesso!');
          },
          error: (err) => {
            this.notificacaoService.erro('Erro ao atualizar produto!');
          }
        });
      }
    });
  }

  deletar(id: string) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.deletar(id).subscribe({
        next: () => {
          this.carregarProdutos();
          this.notificacaoService.sucesso('Produto excluído com sucesso!');
        },
        error: (err) => {
          this.notificacaoService.erro('Erro ao deletar produto!');
        }
      });
    }
  }

  buscar() {
    if (this.termoBusca) {
      this.produtoService.filtrar(this.termoBusca).subscribe({
        next: (dados) => {
          this.produtos.set(dados.content);
        }
      })
    } else {
      this.produtoService.listar().subscribe({
        next: (dados) => {
          this.produtos.set(dados);
        },
        error: (err) => {
          this.notificacaoService.erro('Erro ao listar produtos!');
        }
      })
    }
  }

  limparBusca() {
    this.termoBusca = '';
    this.carregarProdutos();
  }

}
