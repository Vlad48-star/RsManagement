import { Observable } from 'rxjs';
import { IConfirmDialogData } from './../models/confirmModal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}
  confirmDialog(data: IConfirmDialogData): Observable<boolean> {
    return this.dialog
      .open(ConfirmModalComponent, {
        data,
        width: '400px',
      })
      .afterClosed();
  }
}
