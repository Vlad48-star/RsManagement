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
  board$!: Observable<IBoard[]>;

  errorOnsubmit = false;
  titleEditable = false;

  private createForm() {
    this.boardNameForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }

  public editableHandler() {
    this.titleEditable = !this.titleEditable;
  }

  private changeBoard() {
    this.errorOnsubmit = false;
    this.titleEditable = false;
  }
  public delBoardHandler() {
    console.log('asd');
  }
  public onBlurMethod() {
    console.log(this.boardNameForm.value);
  }

  ngOnInit(): void {
    console.log('init');
    this.route.paramMap.subscribe((params) => {
      this.changeBoard();
      return (this.board$ = this.store.select(selectBoard(params.get('id'))));
    });
  }
}
