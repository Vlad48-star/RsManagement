import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LangChangeService } from 'src/app/core/services/lang-change.service';
import { IPerson } from 'src/app/core/services/models/request.model';
import { RequestsService } from 'src/app/core/services/requests.service';
import { IUser, UserActions } from 'src/app/redux/actions/user.action';
import { selectUser } from 'src/app/redux/selectors/user.selector';
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
  personData!: string;

  constructor(
    public auth: LangChangeService,
    private dialog: DialogService,
    private store: Store,
    private router: Router,
    public user: RequestsService
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
    this.store.dispatch(UserActions.load());
    this.store.select(selectUser).subscribe((data) => {
      this.personData = (data as IUser).id || '';
      const loginControl = this.signInForm.get('login');
      const nameControl = this.signInForm.get('name');
      loginControl.setValue((data as IUser).login);
      nameControl.setValue((data as IUser).name);
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

  public editHandler() {
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
        message: 'Are you going to update your data?',
        confirmText: 'Yes',
        cancelText: 'No',
      };
    }
    this.dialog.confirmDialog(this.objectLanguage).subscribe((res) => {
      if (res && this.signInForm.value) {
        this.store.dispatch(
          UserActions.update({
            response: this.signInForm.value as IPerson,
            id: this.personData,
          })
        );
        this.router.navigate(['/main/board']);
      }
    });
  }

  public deleteHandler() {
    if (this.auth.lang === 'ru') {
      this.objectLanguage = {
        title: 'Вы уверены?',
        message: 'Вы собираетесь удалить пользователя?',
        confirmText: 'да',
        cancelText: 'нет',
      };
    } else {
      this.objectLanguage = {
        title: 'Are you sure?',
        message: 'Are you going to delete the user?',
        confirmText: 'Yes',
        cancelText: 'No',
      };
    }
    this.dialog.confirmDialog(this.objectLanguage).subscribe((res) => {
      if (res) {
        this.store.dispatch(UserActions.delete({ id: this.personData }));
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('login');
        this.router.navigate(['/']);
      }
    });
  }
}
