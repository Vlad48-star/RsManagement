import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class ApiInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('id_token');
    if (idToken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + idToken
      );
      const authReq = req.clone({
        headers: headers,
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
