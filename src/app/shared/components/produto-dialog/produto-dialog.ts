import { CategoriaService } from './../../../core/services/categoria';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Categoria, Produto } from '../../../core/models/produto.model';

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
  private categoriaService = inject(CategoriaService);

  readonly data = inject<Produto | null>(MAT_DIALOG_DATA);

  categorias = signal<Categoria[]>([]);

  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    preco: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
    quantidade: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    categoryIds: new FormControl<string[]>([], [Validators.required])
  });

  ngOnInit() {
  this.categoriaService.listar().subscribe({
    next: (dados) => {
      this.categorias.set(dados);
      console.log('data recebido:', this.data);

      if (this.data) {
        this.form.patchValue({
          nome: this.data.nome,
          descricao: this.data.descricao,
          preco: this.data.preco,
          quantidade: this.data.quantidade,
          categoryIds: this.data.category.map(c => c.id)
        });
        console.log('form após patchValue:', this.form.value);
      }
    }
  });
}

  get titulo() {
    return this.data ? 'Editar Produto' : 'Novo Produto';
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
