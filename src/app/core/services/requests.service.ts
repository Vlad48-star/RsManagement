import { selectCurrentColumnID } from './../../redux/selectors/column.selector';
import { selectCurrentBoard } from './../../redux/selectors/board.selector';
import { Store } from '@ngrx/store';
import {
  INewTask,
  ITaskRes,
  ITaskUpdate,
} from './../../redux/actions/task.action';
import { IColumnID } from './../../column/components/models/column.model';
import {
  IBoardID,
  INewBoard,
} from './../../board/components/crate-board/model/newBoard.model';
import {
  IBoard,
  IBoardData,
  IColumn,
  IColumnUpdate,
  INewColumn,
} from './../../board/model/board.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, IToken, IPerson } from './models/request.model';
import { IUser, IUsers } from 'src/app/redux/actions/user.action';

@Injectable()
export class RequestsService {
  constructor(private http: HttpClient, private store: Store) {}
  private url = 'https://calm-beach-54874.herokuapp.com/';

  currentBoardId?: string;
  currentColumnId?: string;

  getCurrentBoardId() {
    this.store
      .select(selectCurrentBoard)
      .subscribe((res) => (this.currentBoardId = res!.id));
  }
  getCurrentColumnsId() {
    this.store.select(selectCurrentColumnID).subscribe();
  }

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

  public addBoard({ title, description }: INewBoard) {
    return this.http.post<IBoard>(this.url + 'boards', { title, description });
  }

  public updateBoard({ title, id, description }: IBoard) {
    return this.http.put<IBoard>(this.url + 'boards/' + id, {
      title,
      description,
    });
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

  public deleteColumn({ id }: IBoardID) {
    this.getCurrentBoardId();
    return this.http.delete<IBoard>(
      this.url + 'boards/' + this.currentBoardId + '/columns/' + id
    );
  }

  public updateColumn({ title, order, id }: IColumnUpdate) {
    this.getCurrentBoardId();
    this.getCurrentColumnsId();
    return this.http.put<IColumnUpdate>(
      this.url + 'boards/' + this.currentBoardId + '/columns/' + id,
      { title, order }
    );
  }

  public addTask(taskData: INewTask, boardId: IBoardID, columnId: IColumnID) {
    return this.http.post<ITaskRes>(
      this.url + 'boards/' + boardId.id + '/columns/' + columnId.id + '/tasks',
      {
        ...taskData,
      }
    );
  }
  public updateTask(
    { ...response }: ITaskUpdate,
    newColumnId = response.columnId
  ) {
    const { title, order, description, userId, columnId, done, id } = response;
    this.getCurrentBoardId();
    return this.http.put<ITaskRes>(
      this.url +
        'boards/' +
        this.currentBoardId +
        '/columns/' +
        columnId +
        '/tasks/' +
        id,
      {
        title,
        order,
        description,
        userId,
        columnId: newColumnId,
        done,
        boardId: this.currentBoardId,
      }
    );
  }
  public deleteTask({ ...response }: { columnId: string; taskId: string }) {
    this.getCurrentBoardId();
    return this.http.delete<{ columnId: string; taskId: string }>(
      this.url +
        'boards/' +
        this.currentBoardId +
        '/columns/' +
        response.columnId +
        '/tasks/' +
        response.taskId
    );
  }
  public loadAllUserss() {
    return this.http.get<IUsers[]>(this.url + 'users');
  }
}
