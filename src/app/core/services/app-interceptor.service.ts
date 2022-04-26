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
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', ' http://localhost:4000/')
      .set(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
      )
      .set(
        'Access-Control-Allow-Headers',
        ' Origin, Content-Type, X-Auth-Token'
      );
    const authReq = req.clone({
      headers: headers,
    });
    return next.handle(authReq);
  }
}
