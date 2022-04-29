import { ILogin, IToken } from './models/request.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, public router: Router) {}
  private url = '/api/';

  login({ login, password }: ILogin) {
    return this.http
      .post<IToken>(this.url + 'signin', {
        login,
        password,
      })
      .pipe(tap(this.setSession), shareReplay());
  }

  private setSession(authResult: IToken): void {
    const expiresAt: moment.Moment = moment().add(86400, 'second');
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    if (localStorage.getItem('id_token') !== null) {
      return moment().isBefore(this.getExpiration());
    }
    return false;
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at') || '';
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
