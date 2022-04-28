import { ILogin, IPerson } from './models/request.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}
  private url = 'http://localhost:4200/api/';

  login({ login, password }: ILogin) {
    console.log({ login, password });
    return this.http.post<ILogin>(this.url + 'signin', {
      login,
      password,
    });
  }

  register({name, login, password}: IPerson) {
    return this.http.post<IPerson>(this.url + 'signup', {
      name,
      login,
      password,
    });
  }
}
