import { CategoriaDialog } from './../../shared/components/categoria-dialog/categoria-dialog';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { CategoriaService } from '../../core/services/categoria';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NotificacaoService } from '../../core/services/notificacao';
import { Categoria } from '../../core/models/produto.model';

@Component({
  selector: 'app-categorias',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss',
})
export class Categorias implements OnInit{

  private categoriaService = inject(CategoriaService);
  private dialog = inject(MatDialog);
  private notificacaoService = inject(NotificacaoService);

  categorias = signal<Categoria[]>([]);
  carregando = signal(true);
  erro = signal('');
  termoBusca = '';

  colunas = ['nome', 'acoes'];

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.carregando.set(true);

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

  abrirDialogNovo() {
    const dialogRef = this.dialog.open(CategoriaDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.categoriaService.criar(resultado).subscribe({
          next: () => {
            this.carregarCategorias();
            this.notificacaoService.sucesso('Categoria criada com sucesso!');
          },
          error: () => {
            this.notificacaoService.erro('Erro ao criar categoria!');
          }
        });
      }
    });
  }

  abrirDialogEditar(categoria: Categoria) {
      const dialogRef = this.dialog.open(CategoriaDialog, {
        width: '500px',
        data: categoria
      });

      dialogRef.afterClosed().subscribe(resultado => {
        if (resultado) {
          this.categoriaService.atualizar(categoria.id, resultado).subscribe({
            next: () => {
              this.carregarCategorias();
              this.notificacaoService.sucesso('Categoria atualizada com sucesso!');
            },
            error: (err) => {
              this.notificacaoService.erro('Erro ao atualizar categoria!');
            }
          });
        }
      });
    }

    deletar(id: string) {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.categoriaService.deletar(id).subscribe({
        next: () => {
          this.carregarCategorias();
          this.notificacaoService.sucesso('Categoria excluída com sucesso!');
        },
        error: (err) => {
          this.notificacaoService.erro('Erro ao deletar categoria!');
        }
      });
    }
  }

}
