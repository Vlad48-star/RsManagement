import { DialogService } from 'src/app/shared/services/dialog.service';
import { ColumnActions } from './../../../redux/actions/column.action';
import { IBoardData } from './../../../board/model/board.model';
import { selectCurrentBoard } from './../../../redux/selectors/board.selector';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LangChangeService } from 'src/app/core/services/lang-change.service';

@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.scss'],
})
export class AddColumnComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private dialog: DialogService,
    public auth: LangChangeService
  ) {
    this.createForm();
  }
  newColumnForm!: FormGroup;
  errorOnsubmit = false;
  currentBoardInfoSubscription!: Subscription;
  currentBoardInfo!: IBoardData;

  private createForm() {
    this.newColumnForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }
  formSubmit() {
    this.errorOnsubmit = true;
    if (!this.newColumnForm.valid) {
      return;
    }
    this.errorOnsubmit = false;

    this.store.dispatch(
      ColumnActions.add({
        response: {
          ...this.newColumnForm.value,
          order: this.currentBoardInfo.columns.length
            ? this.currentBoardInfo.columns[
                this.currentBoardInfo.columns.length - 1
              ].order + 1
            : 1,
        },
        id: { id: this.currentBoardInfo.id },
      })
    );
    this.newColumnForm.reset();
    this.dialog.close();
  }
  ngOnInit(): void {
    this.currentBoardInfoSubscription = this.store
      .select(selectCurrentBoard)
      .subscribe((state) => {
        if (state == undefined) {
          return;
        }
        this.currentBoardInfo = state;
      });
  }
  ngOnDestroy(): void {
    this.currentBoardInfoSubscription.unsubscribe();
  }
  get title() {
    return this.newColumnForm.get('title');
  }
}
