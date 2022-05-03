import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './components/task/task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TaskComponent, AddTaskComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [TaskComponent, AddTaskComponent],
})
export class TaskModule {}
