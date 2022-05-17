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

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  constructor(private dialog: DialogService, private store: Store) {}
  @Input() task!: ITaskUpdate;
  @Input() columnInfo!: IColumn;
  onEditTask() {
    this.dialog.editTaskDialog({
      task: this.task,
      column: this.columnInfo,
    });
  }
  onDeleteTask() {
    this.dialog
      .confirmDialog({
        title: 'Вы уверены?',
        message: 'Вы собираетесь удалить это задание?',
        confirmText: 'да',
        cancelText: 'нет',
      })
      .subscribe((res) => {
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
