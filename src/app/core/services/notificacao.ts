import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificacaoService {

  private snackBar = inject(MatSnackBar);

  sucesso(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      panelClass: ['snack-sucesso'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  erro(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      panelClass: ['snack-erro'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

}
