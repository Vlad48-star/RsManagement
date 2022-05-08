import { Router } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }
  title = 'Login';

  loginForm!: any;

  errorOnsubmit = false;

  formSubmit() {
    this.errorOnsubmit = true;
    if (!this.loginForm.valid) {
      return;
    }
    this.errorOnsubmit = false;
    this.authService.login(this.loginForm.value);
  }

  private createForm() {
    this.loginForm = new FormGroup({
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

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
