import { INewBoard } from './../../board/components/crate-board/model/newBoard.model';
import { RequestsService } from './requests.service';
import { BoardActions } from './../../redux/actions/board.action';
import { IPerson } from './models/request.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Injectable()
export class DataService {
  constructor(
    private http: HttpClient,
    private store: Store,
    private requestsService: RequestsService
  ) {}
  private url = '/api/';

  register({ name, login, password }: IPerson) {
    return this.http.post<IPerson>(this.url + 'signup', {
      name,
      login,
      password,
    });
  }

  loadBoardData() {
    console.log('load_data');
    this.requestsService.getBoardData().subscribe((response) => {
      this.store.dispatch(BoardActions.get({ response }));
    });
  }
  addBoard({ title }: INewBoard) {
    console.log('add_board_data');
    this.requestsService.addBoard(title).subscribe((response) => {
      this.store.dispatch(BoardActions.add({ response }));
    });
  }
}
