import { DataService } from './../../core/services/data.service';
import { FormValidatorService } from './../../core/services/form-validator.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private formValidatorService: FormValidatorService,
    private dataService: DataService
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
    // this.loginService.submitHandler(this.loginForm.value);
    console.log(this.loginForm.value);
    this.dataService
      .login(this.loginForm.value)
      .subscribe((response) => console.log(response));
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
