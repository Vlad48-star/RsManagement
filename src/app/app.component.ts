import { DialogService } from './shared/services/dialog.service';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    authService: AuthService,
    router: Router,
    private dialogServise: DialogService
  ) {}
}
