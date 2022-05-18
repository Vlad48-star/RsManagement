import { Store } from '@ngrx/store';
import { ITaskUpdate, TaskActions } from './../../../redux/actions/task.action';
import { LangChangeService } from './../../../core/services/lang-change.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IColumn } from 'src/app/board/model/board.model';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { task: ITaskUpdate; column: IColumn },
    private dialog: DialogService,
    public auth: LangChangeService,
    private store: Store
  ) {
    this.oldTaskData = { ...data.task };
  }

  oldTaskData!: ITaskUpdate;
  editTaskForm!: FormGroup;

  ngOnInit(): void {
    console.log(this.data);
    this.editTaskForm = new FormGroup({
      taskTitle: new FormControl(this.oldTaskData.title, [Validators.required]),
      taskDescription: new FormControl(this.oldTaskData.description, [
        Validators.required,
      ]),
      taskDone: new FormControl(this.oldTaskData.done, [Validators.required]),
    });
  }

  onSubmit() {
    //TODO Добавить проверку на наличие ошибок при сабите
    this.store.dispatch(
      TaskActions.updateTask({
        response: {
          title: this.editTaskForm.get('taskTitle')?.value,
          description: this.editTaskForm.get('taskDescription')?.value,
          done: this.editTaskForm.get('taskDone')?.value,
          id: this.data.task.id,
          order: this.data.task.order,
          userId: this.data.task.userId,
          columnId: this.data.column.id,
        },
      })
    );
    this.dialog.close();
  }
}
