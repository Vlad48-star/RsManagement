import { IBoard } from './../../board/model/board.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, EMPTY } from 'rxjs';

@Injectable()
export class RequestsService {
  constructor(private http: HttpClient) {}
  private url = '/api/';
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
