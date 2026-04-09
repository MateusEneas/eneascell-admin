import { CategoriaService } from './../../../core/services/categoria';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Categoria } from '../../../core/models/produto.model';

@Component({
  selector: 'app-produto-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './produto-dialog.html',
  styleUrl: './produto-dialog.scss',
})
export class ProdutoDialog implements OnInit{

  private dialogRef = inject(MatDialogRef<ProdutoDialog>);
  private CategoriaService = inject(CategoriaService);

  categorias = signal<Categoria[]>([]);

  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    preco: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
    quantidade: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    categoryIds: new FormControl<string[]>([], [Validators.required])
  });

  ngOnInit() {
    this.CategoriaService.listar().subscribe({
      next: (dados) => {
        this.categorias.set(dados);
      }
    });
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
