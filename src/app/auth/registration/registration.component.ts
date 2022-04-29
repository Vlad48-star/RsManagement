import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  signInForm: any;

  constructor(private auth: DataService, private router: Router) {
    this.createForm();
  }

  onSubmit(){
    this.auth.register(this.signInForm.value).subscribe(response => response);
    this.router.navigateByUrl('/board');
  }

  private createForm() {
    this.signInForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
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
    const count = 8 - this.signInForm.get('password').errors['minlength']['actualLength'];
    return count;
  }
}

