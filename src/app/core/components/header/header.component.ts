import { DialogService } from 'src/app/shared/services/dialog.service';
import { BoardActions } from './../../../redux/actions/board.action';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store, private dialog: DialogService) {}
  ngOnInit(): void {
    this.store.dispatch(BoardActions.load());
  }
  onCreateBoard() {
    this.dialog.createBoardFormDialog();
  }
}
