import { DialogService } from 'src/app/shared/services/dialog.service';
import { BoardActions } from './../../../redux/actions/board.action';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { LangChangeService } from 'src/app/core/services/lang-change.service';

@Component({
  selector: 'app-crate-board',
  templateUrl: './crate-board.component.html',
  styleUrls: ['./crate-board.component.scss'],
})
export class CrateBoardComponent {
  constructor(private store: Store, private dialog: DialogService, public auth: LangChangeService) {
    this.createForm();
  }
  newBoardForm!: FormGroup;
  errorOnsubmit = false;

  formSubmit() {
    this.errorOnsubmit = true;
    if (!this.newBoardForm.valid) {
      return;
    }
    this.errorOnsubmit = false;
    this.store.dispatch(
      BoardActions.add({ response: this.newBoardForm.value })
    );
    this.newBoardForm.reset();
    this.dialog.close();
  }
  private createForm() {
    this.newBoardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }
  get title() {
    return this.newBoardForm.get('title');
  }
}
