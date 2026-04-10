export interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export type UserRole = 'ADMIN' | 'USER';
