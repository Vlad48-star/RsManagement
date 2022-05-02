import { BoardActions } from './../../../redux/actions/board.action';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first, Observable, mergeMap } from 'rxjs';
import { IBoard } from './../../model/board.model';
import { selectBoard } from './../../../redux/selectors/board.selector';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  constructor(public route: ActivatedRoute, private store: Store) {
    this.createForm();
  }
  boardNameForm!: FormGroup;
  data!: IBoard;

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
    this.store.dispatch(
      BoardActions.delete({ response: { id: this.data.id } })
    );
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
    this.route.paramMap.subscribe((params) => {
      this.store.select(selectBoard(params.get('id'))).subscribe((data) => {
        this.changeBoard(data[0]);
      });
    });
  }
}
