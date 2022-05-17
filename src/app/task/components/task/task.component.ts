import { ITaskRes, ITaskUpdate } from './../../../redux/actions/task.action';
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
  constructor(private dialog: DialogService) {}
  @Input() task!: ITaskUpdate;
  @Input() columnInfo!: IColumn;
  onEditTask() {
    this.dialog.editTaskDialog({
      task: this.task,
      column: this.columnInfo,
    });
  }
}
