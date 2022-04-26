import { ILogin } from './models/request.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient) {}
  private url = 'http://localhost:4200/api/';

  login({ login, password }: ILogin) {
    console.log({ login, password });
    return this.httpClient.post<ILogin>(this.url + 'signin', {
      login,
      password,
    });
  }
}
