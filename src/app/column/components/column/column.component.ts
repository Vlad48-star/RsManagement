import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestsService } from './../../../core/services/requests.service';
import { ColumnActions } from './../../../redux/actions/column.action';
import { Store } from '@ngrx/store';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { IColumn, ITask } from './../../../board/model/board.model';
import { LangChangeService } from 'src/app/core/services/lang-change.service';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  constructor(
    private dialog: DialogService,
    private store: Store,
    private requestService: RequestsService,
    public auth: LangChangeService
  ) {}
  @ViewChild('input', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }
  @Input() columnInfo!: IColumn;
  @Input() columnOrder!: number;
  editColumnForm!: FormGroup;
  ngOnInit(): void {
    this.editColumnForm = new FormGroup({
      columnTitle: new FormControl(this.columnInfo.title, [
        Validators.required,
      ]),
    });
  }
  isEditTaskActive = false;

  updateCurrentColumn() {
    this.store.dispatch(
      ColumnActions.updateCurrentColumn({ currentColumn: this.columnInfo })
    );
  }
  onEditColumn() {
    this.isEditTaskActive = true;
    this.updateCurrentColumn();
  }

  updateColumn() {
    const oldTitle = this.columnInfo.title;
    if (this.editColumnForm.get('columnTitle')?.value !== oldTitle) {
      this.store.dispatch(
        ColumnActions.update({
          response: {
            title: this.editColumnForm.get('columnTitle')?.value,
            order: this.columnInfo.order,
            id: this.columnInfo.id,
          },
        })
      );
      this.isEditTaskActive = false;
    }
    console.log(this.editColumnForm.get('columnTitle')?.value);
    this.isEditTaskActive = false;
  }

  onAddTask() {
    this.dialog.addTaskDialog();
    this.updateCurrentColumn();
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
  drop(event: CdkDragDrop<ITask[]>) {
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // } else {
    //   transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // }
  }
}
