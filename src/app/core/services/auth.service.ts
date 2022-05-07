import { IUser } from 'src/app/redux/actions/user.action';
import { UserActions, TUserState } from './../../redux/actions/user.action';
import { RequestsService } from './requests.service';
import { ILogin, IToken, IPerson } from './models/request.model';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/redux/selectors/user.selector';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private requestsService: RequestsService,
    private store: Store
  ) {}

  public setSession(authResult: IToken, login: string): void {
    const expiresAt: moment.Moment = moment().add(86400, 'second');
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('login', login);
    this.router.navigate(['/board']);
  }
  public login(formData: ILogin) {
    this.store.dispatch(UserActions.loginUser({ response: formData }));
    // return this.requestsService.login({ ...formData }, this.setSession);
  }
  public register(formData: IPerson) {
    this.store.dispatch(UserActions.registerUser({ response: formData }));
    // return this.requestsService.register({ ...formData });
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('login');
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
