import { DialogService } from 'src/app/shared/services/dialog.service';
import { IBoard } from './../../model/board.model';
import { Observable } from 'rxjs';
import { selectAllBoard } from './../../../redux/selectors/board.selector';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { LangChangeService } from 'src/app/core/services/lang-change.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  constructor(
    private store: Store,
    private dialog: DialogService,
    public auth: LangChangeService
  ) {}
  boards$: Observable<IBoard[]> = this.store.select(selectAllBoard);
  onCreateNewBoard() {
    this.dialog.createBoardFormDialog();
  }
}
