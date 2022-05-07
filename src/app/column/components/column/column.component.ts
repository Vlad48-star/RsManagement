import { IColumn } from './../../../board/model/board.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() columnInfo!: IColumn;
  @Input() columnOrder!: number;
  ngOnInit(): void {
    console.log(this.columnInfo);
  }
}
