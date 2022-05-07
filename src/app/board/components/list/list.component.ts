import { DialogService } from 'src/app/shared/services/dialog.service';
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
export class ListComponent {
  constructor(
    public dataService: DataService,
    private store: Store,
    private dialog: DialogService
  ) {}
  boards$: Observable<IBoard[]> = this.store.select(selectAllBoard);
  onCreateNewBoard() {
    this.dialog.createBoardFormDialog();
  }
}
