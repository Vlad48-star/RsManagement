import { IBoard } from './../../board/model/board.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, EMPTY, shareReplay, tap } from 'rxjs';
import { ILogin, IToken, IPerson } from './models/request.model';

@Injectable()
export class RequestsService {
  constructor(private http: HttpClient) {}
  private url = '/api/';

  public login(
    { login, password }: ILogin,
    storeMethod: (data: IToken) => void
  ) {
    return this.http
      .post<IToken>(this.url + 'signin', {
        login,
        password,
      })
      .pipe(tap(storeMethod), shareReplay());
  }

  public register({ name, login, password }: IPerson) {
    return this.http.post<IPerson>(this.url + 'signup', {
      name,
      login,
      password,
    });
  }

  public getBoardData() {
    return this.http.get<IBoard[]>(this.url + 'boards').pipe(
      retry(4),
      catchError((error) => {
        console.log('[ERROR]: ', error);
        return EMPTY;
      })
    );
  }

  public addBoard(title: string) {
    return this.http.post<IBoard>(this.url + 'boards', { title }).pipe(
      retry(4),
      catchError((error) => {
        console.log('[ERROR]: ', error);
        return EMPTY;
      })
    );
  }
}
