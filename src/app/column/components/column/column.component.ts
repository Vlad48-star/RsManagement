import { IColumn } from './../../../board/model/board.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() columnInfo!: IColumn;
}
