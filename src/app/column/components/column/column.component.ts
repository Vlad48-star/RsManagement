import { RequestsService } from './../../../core/services/requests.service';
import { ColumnActions } from './../../../redux/actions/column.action';
import { Store } from '@ngrx/store';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { IColumn } from './../../../board/model/board.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  constructor(
    private dialog: DialogService,
    private store: Store,
    private requestService: RequestsService
  ) {}
  @Input() columnInfo!: IColumn;
  @Input() columnOrder!: number;
  ngOnInit(): void {
    console.log(this.columnInfo);
    this.editingTitle = this.columnInfo.title;
  }
  editingTitle!: string;
  isEditTaskActive = false;
  qwe() {
    this.requestService.qwe();
  }

  updateCurrentColumnId() {
    this.store.dispatch(
      ColumnActions.updateColumnId({ currentColumn: this.columnInfo })
    );
  }
  onEditColumn() {
    this.isEditTaskActive = true;
    this.updateCurrentColumnId();
  }

  updateColumn() {
    const oldTitle = this.columnInfo.title;
    if (this.editingTitle !== oldTitle) {
      this.store.dispatch(
        ColumnActions.update({
          response: {
            title: this.editingTitle,
            order: this.columnInfo.order,
          },
        })
      );
    }
    this.isEditTaskActive = !this.isEditTaskActive;
  }
  onAddTask() {
    this.dialog.addTaskDialog();
  }

  onDeleteColumn() {
    this.dialog
      .confirmDialog({
        title: 'Вы уверены?',
        message: 'Вы собираетесь удалить эту колонку?',
        confirmText: 'да',
        cancelText: 'нет',
      })
      .subscribe((res) => {
        if (res)
          this.store.dispatch(
            ColumnActions.delete({ response: { id: this.columnInfo.id } })
          );
      });
  }
}
