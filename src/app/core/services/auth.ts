import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080';

  login(email: string, senha: string) {
    return this.http.post<string>(`${this.apiUrl}/auth/login`, {
      email,
      senha
    }, { responseType: 'text' as 'json'});
  }

}
