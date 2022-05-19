import { CoreModule } from './../core/core.module';
import { SortByPipe } from './../core/pipe/sort-by.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './components/column/column.component';
import { AddColumnComponent } from './components/add-column/add-column.component';
import { TaskModule } from '../task/task.module';
import { AutofocusDirective } from './directives/autofocus.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ColumnComponent, AddColumnComponent, AutofocusDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    TaskModule,
    MatDialogModule,
    MatIconModule,
    CoreModule,
  ],
  exports: [ColumnComponent, AddColumnComponent],
})
export class ColumnModule {}
