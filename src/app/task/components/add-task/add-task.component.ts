import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  constructor(private store: Store) {
    this.createForm();
  }
  newTaskForm!: FormGroup;
  showAddTask = false;
  errorOnsubmit = false;

  formSubmit() {
    this.errorOnsubmit = true;
    if (!this.newTaskForm.valid) {
      return;
    }
    console.log(this.newTaskForm.value);
    this.errorOnsubmit = false;
    this.newTaskForm.reset();
    this.showAddTask = !this.showAddTask;
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
