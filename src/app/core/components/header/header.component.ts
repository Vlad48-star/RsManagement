import { DialogService } from 'src/app/shared/services/dialog.service';
import { BoardActions } from './../../../redux/actions/board.action';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { LangChangeService } from '../../services/lang-change.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private store: Store,
    private dialog: DialogService,
    public langService: LangChangeService,
    public auth: AuthService
  ) {}

  exit() {
    this.auth.logout();
  }

  ngOnInit(): void {
    this.langService.lang = localStorage.getItem('lang');
    this.store.dispatch(BoardActions.load());
  }

  onCreateBoard() {
    this.dialog.createBoardFormDialog();
  }
}
