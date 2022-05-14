import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LangChangeService } from 'src/app/core/services/lang-change.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  signInForm: any;
  constructor(public auth: LangChangeService) { }

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

  editSubmit(){

  }
}
