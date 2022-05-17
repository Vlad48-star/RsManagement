import { ITaskRes, ITaskUpdate } from './../../redux/actions/task.action';
import { EditTaskComponent } from './../../task/components/edit-task/edit-task.component';
import { AddTaskComponent } from './../../task/components/add-task/add-task.component';
import { AddColumnComponent } from './../../column/components/add-column/add-column.component';
import { CrateBoardComponent } from './../../board/components/crate-board/crate-board.component';
import { Observable } from 'rxjs';
import { IConfirmDialogData } from './../models/confirmModal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { IColumn } from 'src/app/board/model/board.model';

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
  editTaskDialog(data: { task: ITaskUpdate; column: IColumn }) {
    return this.dialog.open(EditTaskComponent, {
      data,
    });
  }
  close() {
    this.dialog.closeAll();
  }
}
