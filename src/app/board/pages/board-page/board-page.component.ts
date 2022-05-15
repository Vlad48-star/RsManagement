import { Subscription, Observable } from 'rxjs';
import {
  BoardActions,
  TCurrentBoardState,
} from './../../../redux/actions/board.action';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IBoard, IColumn } from './../../model/board.model';
import {
  selectBoard,
  selectCurrentBoard,
} from './../../../redux/selectors/board.selector';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectAllColumn } from 'src/app/redux/selectors/column.selector';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { LangChangeService } from 'src/app/core/services/lang-change.service';
import { IConfirmDialogData } from 'src/app/shared/models/confirmModal';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  constructor(
    public route: ActivatedRoute,
    private store: Store,
    private dialog: DialogService,
    public auth: LangChangeService
  ) {
    this.createForm();
  }
  objectLanguage!: IConfirmDialogData;
  boardNameForm!: FormGroup;
  data!: IBoard;

  stateBoardSubscription!: Subscription;
  routeSubscription!: Subscription;

  currentBoard$!: Observable<TCurrentBoardState>;

  errorOnsubmit = false;

  private createForm() {
    this.boardNameForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }

  private changeBoard(newData: IBoard) {
    if (newData == undefined) {
      return;
    }
    this.data = newData;
    this.errorOnsubmit = false;
    this.boardNameForm.patchValue({ title: newData.title });
    this.store.dispatch(BoardActions.get({ response: { id: this.data.id } }));
  }

  public delBoardHandler() {
    if(this.auth.lang === 'ru'){
      this.objectLanguage = {
        title: 'Вы уверены?',
        message: 'Вы собираетесь удалить этот таск(эту колонку)?',
        confirmText: 'да',
        cancelText: 'нет',
      }
    } else {
      this.objectLanguage = {
        title: 'Are you sure?',
        message: 'Are you going to delete this task (this column)?',
        confirmText: 'Yes',
        cancelText: 'No',
      }
    }
    this.dialog
      .confirmDialog(this.objectLanguage)
      .subscribe((res) => {
        if (res)
          this.store.dispatch(
            BoardActions.delete({ response: { id: this.data.id } })
          );
      });
  }
  public onBlurMethod() {
    if (this.boardNameForm.value.title == '') {
      this.boardNameForm.patchValue({ title: this.data.title });
    }
    this.store.dispatch(
      BoardActions.update({
        response: { title: this.boardNameForm.value.title, id: this.data.id },
      })
    );
  }

  ngOnInit(): void {

    console.log('init');
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.stateBoardSubscription = this.store
        .select(selectBoard(params.get('id')))
        .subscribe((data) => {
          this.changeBoard(data[0]);
        });
    });
    this.currentBoard$ = this.store.select(selectCurrentBoard);
  }
  ngOnDestroy(): void {
    this.stateBoardSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  onAddColumn() {
    this.dialog.createColumnDialog();
  }
}
