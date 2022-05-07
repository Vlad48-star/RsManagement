import { DialogService } from 'src/app/shared/services/dialog.service';
import { IColumn } from './../../../board/model/board.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  constructor(private dialog: DialogService) {}
  @Input() columnInfo!: IColumn;
  @Input() columnOrder!: number;
  ngOnInit(): void {
    console.log(this.columnInfo);
  }
  onAddTask() {
    this.dialog.addTaskDialog();
  }
}
