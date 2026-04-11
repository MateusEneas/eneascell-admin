import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';
import { AuthStateService } from '../../core/services/auth-state';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);
  private authStateService = inject(AuthStateService);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required])
  })

  entrar() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const {email, senha} = this.loginForm.value;

    this.authService.login(email!, senha!)
    .subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
        this.authStateService.carregarUsuario();
        this.router.navigate(['/produtos']);
      },
      error: () => {
        console.log('Email ou senha inválidos');
      }
    });
  }

}
