import { AddTaskComponent } from './../../task/components/add-task/add-task.component';
import { AddColumnComponent } from './../../column/components/add-column/add-column.component';
import { CrateBoardComponent } from './../../board/components/crate-board/crate-board.component';
import { Observable } from 'rxjs';
import { IConfirmDialogData } from './../models/confirmModal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}
  confirmDialog(data: IConfirmDialogData): Observable<boolean> {
    return this.dialog
      .open(ConfirmModalComponent, {
        data,
        width: '400px',
      })
      .afterClosed();
  }
  createBoardFormDialog() {
    return this.dialog.open(CrateBoardComponent);
  }
  createColumnDialog() {
    return this.dialog.open(AddColumnComponent);
  }
  addTaskDialog() {
    return this.dialog.open(AddTaskComponent);
  }
  close() {
    this.dialog.closeAll();
  }
}
