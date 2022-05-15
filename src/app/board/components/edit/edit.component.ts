import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LangChangeService } from 'src/app/core/services/lang-change.service';
import { BoardActions } from 'src/app/redux/actions/board.action';
import { UserActions } from 'src/app/redux/actions/user.action';
import { IConfirmDialogData } from 'src/app/shared/models/confirmModal';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { IBoard } from '../../model/board.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  signInForm: any;
  objectLanguage!: IConfirmDialogData;
  data!: IBoard;

  constructor(
    public auth: LangChangeService,
    private dialog: DialogService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      login: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  get name() {
    return this.signInForm.get('name');
  }

  get login() {
    return this.signInForm.get('login');
  }

  get password() {
    return this.signInForm.get('password');
  }

  get count() {
    const count =
      8 - this.signInForm.get('password').errors['minlength']['actualLength'];
    return count;
  }

  public delBoardHandler() {
    if (this.auth.lang === 'ru') {
      this.objectLanguage = {
        title: 'Вы уверены?',
        message: 'Вы собираетесь обновить данные?',
        confirmText: 'да',
        cancelText: 'нет',
      };
    } else {
      this.objectLanguage = {
        title: 'Are you sure?',
        message: 'Are you about to update your data?',
        confirmText: 'Yes',
        cancelText: 'No',
      };
    }
    this.dialog.confirmDialog(this.objectLanguage).subscribe((res) => {
      if (res)
        this.store.dispatch(
          BoardActions.delete({ response: { id: this.data.id } })
        );
    });
  }
  updatePerson() {
    this.store.dispatch(
      UserActions.load()
    );
    this.store
  }
}
