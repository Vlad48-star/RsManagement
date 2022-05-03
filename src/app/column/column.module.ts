import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './components/column/column.component';
import { AddColumnComponent } from './components/add-column/add-column.component';

@NgModule({
  declarations: [ColumnComponent, AddColumnComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ColumnComponent, AddColumnComponent],
})
export class ColumnModule {}
