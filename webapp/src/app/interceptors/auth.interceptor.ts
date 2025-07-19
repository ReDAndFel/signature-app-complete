import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Asegurar que las cookies se envíen con las peticiones
    const authReq = req.clone({
      setHeaders: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true  // Importante: esto envía las cookies
    });

    return next.handle(authReq);
  }
}
