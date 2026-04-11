import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    const reqComToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(reqComToken).pipe(
      catchError((erro) => {
        if (erro.status === HttpStatusCode.Unauthorized) {
          localStorage.removeItem('token');
          router.navigate(['/login']);
        }
        return throwError(() => erro);
      })
    );
  }

  return next(req);
};
