import { DialogService } from 'src/app/shared/services/dialog.service';
import {
  INewTask,
  INewTaskForm,
  TaskActions,
} from './../../../redux/actions/task.action';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LangChangeService } from 'src/app/core/services/lang-change.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  constructor(private store: Store, private dialog: DialogService, public auth: LangChangeService) {
    this.createForm();
  }
  @Input() taskOrder!: number;
  @Input() columnInfo!: string;

  newTaskForm!: FormGroup;
  showAddTask = false;
  errorOnsubmit = false;

  formSubmit() {
    this.errorOnsubmit = true;

    if (!this.newTaskForm.valid) {
      return;
    }

    this.store.dispatch(
      TaskActions.createTask({
        response: {
          title: this.newTaskForm.value.title,
          order: this.taskOrder,
          description: 'descriptions',
        },
        columnId: this.columnInfo,
      })
    );

    this.errorOnsubmit = false;
    this.newTaskForm.reset();
    this.showAddTask = !this.showAddTask;
    this.dialog.close();
  }
  private createForm() {
    this.newTaskForm = new FormGroup(
      {
        title: new FormControl('', [Validators.required]),
      },
      { updateOn: 'blur' }
    );
  }
  public toggleNewTaskForm() {
    this.showAddTask = !this.showAddTask;
  }
  get title() {
    return this.newTaskForm.get('title');
  }
}
