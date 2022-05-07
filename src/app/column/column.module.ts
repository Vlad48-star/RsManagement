import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './components/column/column.component';
import { AddColumnComponent } from './components/add-column/add-column.component';
import { TaskModule } from '../task/task.module';

@NgModule({
  declarations: [ColumnComponent, AddColumnComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [ColumnComponent, AddColumnComponent],
})
export class ColumnModule {}
