import { Router } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';
import { FormValidatorService } from './../../core/services/form-validator.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private formValidatorService: FormValidatorService,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }
  title = 'Вход';

  loginForm!: FormGroup;

  errorOnsubmit = false;

  formSubmit() {
    this.errorOnsubmit = true;
    if (!this.loginForm.valid) {
      return;
    }
    this.errorOnsubmit = false;
    this.authService
      .login(this.loginForm.value)
      .pipe(first())
      .subscribe(() => {
        // this.loginService.submitHandler(this.loginForm.value);
        this.router.navigate(['/board']);
      });
  }

  private createForm() {
    this.loginForm = new FormGroup({
      login: new FormControl('user001', [
        Validators.required,
        // Validators.pattern(this.formValidatorService.emailValidatorRegEx),
      ]),
      password: new FormControl('userpass@123', [Validators.required]),
    });
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
