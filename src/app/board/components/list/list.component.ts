import { BoardActions } from './../../../redux/actions/board.action';
import { IBoard } from './../../model/board.model';
import { Observable } from 'rxjs';
import { selectAllBoard } from './../../../redux/selectors/board.selector';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/core/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(public dataService: DataService, private store: Store) {}
  boards$: Observable<IBoard[]> = this.store.select(selectAllBoard);

  ngOnInit(): void {
    this.store.dispatch(BoardActions.load());
  }
}
