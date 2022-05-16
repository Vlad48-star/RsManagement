import { INewTask, ITaskRes } from './../../redux/actions/task.action';
import { IColumnID } from './../../column/components/models/column.model';
import { IBoardID } from './../../board/components/crate-board/model/newBoard.model';
import {
  IBoard,
  IBoardData,
  IColumn,
  INewColumn,
} from './../../board/model/board.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, IToken, IPerson } from './models/request.model';
import { IUser } from 'src/app/redux/actions/user.action';

@Injectable()
export class RequestsService {
  constructor(private http: HttpClient) {}
  private url = 'https://still-waters-55383.herokuapp.com/';

  public login({ login, password }: ILogin) {
    return this.http.post<IToken>(this.url + 'signin', {
      login,
      password,
    });
  }

  public register({ name, login, password }: IPerson) {
    return this.http.post<IPerson>(this.url + 'signup', {
      name,
      login,
      password,
    });
  }

  public update({ name, login, password }: IPerson, id: string) {
    return this.http.put<IPerson>(this.url + 'users/' + id, {
      name,
      login,
      password,
    });
  }

  public delete(id: string) {
    return this.http.delete(this.url + 'users/' + id);
  }

  public loadAllUsers() {
    return this.http.get<IUser[]>(this.url + 'users');
  }

  public loadAllBoard() {
    return this.http.get<IBoard[]>(this.url + 'boards');
  }

  public getBoardData({ id }: IBoardID) {
    return this.http.get<IBoardData>(this.url + 'boards/' + id);
  }

  public addBoard(title: string) {
    return this.http.post<IBoard>(this.url + 'boards', { title });
  }

  public updateBoard({ title, id }: IBoard) {
    return this.http.put<IBoard>(this.url + 'boards/' + id, { title });
  }

  public deleteBoard({ id }: IBoardID) {
    return this.http.delete<IBoard>(this.url + 'boards/' + id);
  }

  public loadAllColumn({ id }: IBoardID) {
    return this.http.get<IColumn[]>(this.url + 'boards/' + id + '/columns');
  }
  public addColumn({ title, order }: INewColumn, { id }: IBoardID) {
    return this.http.post<IColumn>(this.url + 'boards/' + id + '/columns', {
      title,
      order,
    });
  }

  public addTask(taskData: INewTask, boardId: IBoardID, columnId: IColumnID) {
    return this.http.post<ITaskRes>(
      this.url + 'boards/' + boardId.id + '/columns/' + columnId.id + '/tasks',
      {
        ...taskData,
      }
    );
  }
}
