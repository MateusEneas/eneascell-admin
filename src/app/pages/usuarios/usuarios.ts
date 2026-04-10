import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { UsuarioService } from '../../core/services/usuario';
import { Usuario } from '../../core/models/usuario.model';
import { UsuarioDialog } from '../../shared/components/usuario-dialog/usuario-dialog';
import { ProdutoDialog } from '../../shared/components/produto-dialog/produto-dialog';
import { NotificacaoService } from '../../core/services/notificacao';

@Component({
  selector: 'app-usuarios',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDialogModule
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios {

  private usuarioService = inject(UsuarioService);
  private dialog = inject(MatDialog);
  private notificacaoService = inject(NotificacaoService);

  usuarios = signal<Usuario[]>([]);
  carregando = signal(true);
  erro = signal('');

  colunas = ['nome', 'email', 'role', 'acoes'];

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.carregando.set(true);

    this.usuarioService.listar().subscribe({
      next: (dados) => {
        this.usuarios.set(dados);
        this.carregando.set(false);
      },
      error: (err) => {
        console.log('Erro ao carregar usuários:', err);
        this.erro.set('Erro ao carregar usuários');
        this.carregando.set(false);
      }
    });
  }

  abrirDialogNovo() {
    const dialogRef = this.dialog.open(UsuarioDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.usuarioService.criar(resultado).subscribe({
          next: () => {
            this.carregarUsuarios();
            this.notificacaoService.sucesso('Usuário criado com sucesso!');
          },
          error: (err) => {
            this.notificacaoService.erro('Erro ao criar usuário!');
          }
        });
      }
    });
  }

  abrirDialogEditar(usuario: Usuario) {
    const dialogRef = this.dialog.open(UsuarioDialog, {
      width: '500px',
      data: usuario
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.usuarioService.atualizar(usuario.id, resultado).subscribe({
          next: () => {
            this.carregarUsuarios();
            this.notificacaoService.sucesso('Usuário atualizado com sucesso!');
          },
          error: (err) => {
            this.notificacaoService.erro('Erro ao atualizar usuário!');
          }
        });
      }
    });
  }

  deletar(id: string) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuarioService.deletar(id).subscribe({
        next: () => {
          this.carregarUsuarios();
        },
        error: (err) => {
          console.log('Erro ao deletar usuário:', err);
        }
      });
    }
  }

}
