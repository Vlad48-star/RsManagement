import { Store } from '@ngrx/store';
import {
  ITaskRes,
  ITaskUpdate,
  TaskActions,
} from './../../../redux/actions/task.action';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { RequestsService } from './../../../core/services/requests.service';
import { ITask, IColumn } from './../../../board/model/board.model';
import { Component, Input } from '@angular/core';
import { LangChangeService } from 'src/app/core/services/lang-change.service';
import { IConfirmDialogData } from 'src/app/shared/models/confirmModal';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  constructor(
    private dialog: DialogService,
    private store: Store,
    public auth: LangChangeService
  ) {}
  @Input() task!: ITaskUpdate;
  @Input() columnInfo!: IColumn;
  objectLanguage!: IConfirmDialogData;
  onEditTask() {
    this.dialog.editTaskDialog({
      task: this.task,
      column: this.columnInfo,
    });
  }
  onDeleteTask() {
    if (this.auth.lang === 'ru') {
      this.objectLanguage = {
        title: 'Вы уверены?',
        message: 'Вы собираетесь удалить это задание?',
        confirmText: 'да',
        cancelText: 'нет',
      };
    } else {
      this.objectLanguage = {
        title: 'Are you sure?',
        message: 'Are you going to delete this task?',
        confirmText: 'Yes',
        cancelText: 'No',
      };
    }
    this.dialog.confirmDialog(this.objectLanguage).subscribe((res) => {
      if (res)
        this.store.dispatch(
          TaskActions.deleteTask({
            response: {
              columnId: this.columnInfo?.id,
              taskId: this.task?.id,
            },
          })
        );
    });
  }
}
