import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LangChangeService } from 'src/app/core/services/lang-change.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  signInForm: any;

  constructor(
    private register: AuthService,
    private router: Router,
    public auth: LangChangeService
  ) {
    this.createForm();
  }

  onSubmit() {
    this.register.person = this.signInForm.value.login;
    this.register.register(this.signInForm.value);
  }

  private createForm() {
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
}
