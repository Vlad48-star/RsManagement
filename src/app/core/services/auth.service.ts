import { RequestsService } from './requests.service';
import { ILogin, IToken, IPerson } from './models/request.model';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public router: Router, public requestsService: RequestsService) {}

  private setSession(authResult: IToken): void {
    const expiresAt: moment.Moment = moment().add(86400, 'second');
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
  public login(formData: ILogin) {
    return this.requestsService.login({ ...formData }, this.setSession);
  }
  public register(formData: IPerson) {
    return this.requestsService.register({ ...formData });
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
