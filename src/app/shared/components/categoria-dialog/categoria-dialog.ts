import { CategoriaService } from './../../../core/services/categoria';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Categoria } from '../../../core/models/produto.model';

@Component({
  selector: 'app-categoria-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './categoria-dialog.html',
  styleUrl: './categoria-dialog.scss',
})
export class CategoriaDialog implements OnInit {
  private dialogRef = inject(MatDialogRef<CategoriaDialog>);
  private CategoriaService = inject(CategoriaService);

  categorias = signal<Categoria[]>([]);

  readonly data = inject<Categoria | null>(MAT_DIALOG_DATA);

  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.CategoriaService.listar().subscribe({
      next: (dados) => {
        this.categorias.set(dados);

        if (this.data) {
          this.form.patchValue({
            nome: this.data.nome,
          });
        }
      },
    });
  }

  get titulo() {
    return this.data ? 'Editar Categoria' : 'Nova Categoria';
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
