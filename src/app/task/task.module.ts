import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './components/task/task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

@NgModule({
  declarations: [TaskComponent, AddTaskComponent, EditTaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [TaskComponent, AddTaskComponent],
})
export class TaskModule {}
