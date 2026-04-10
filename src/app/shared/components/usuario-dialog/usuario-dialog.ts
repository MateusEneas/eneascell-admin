import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioService } from '../../../core/services/usuario';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-usuario-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './usuario-dialog.html',
  styleUrl: './usuario-dialog.scss',
})
export class UsuarioDialog implements OnInit{

  private dialogRef = inject(MatDialogRef<UsuarioDialog>);

  readonly data = inject<Usuario | null>(MAT_DIALOG_DATA);

  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    if (this.data) {

      this.form.get('senha')?.clearValidators();
      this.form.get('senha')?.updateValueAndValidity();

      this.form.patchValue({
        nome: this.data.nome,
        email: this.data.email,
        role: this.data.role,
      });

    }
  }

  get titulo() {
    return this.data ? 'Editar Usuário' : 'Novo Usúario';
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
