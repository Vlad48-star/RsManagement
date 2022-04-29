import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  signInForm: any;

  constructor(private auth: AuthService, private router: Router) {
    this.createForm();
  }

  onSubmit() {
    this.auth.register(this.signInForm.value).subscribe((response) => response);
    this.router.navigateByUrl('/board');
  }

  private createForm() {
    this.signInForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        // Validators.max(16),
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        // Validators.min(1),
        Validators.pattern(/^[A-z0-9]*$/),
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
}
