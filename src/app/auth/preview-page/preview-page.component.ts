import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.scss'],
})
export class PreviewPageComponent {

  constructor(public router: Router) {}

<<<<<<< HEAD
  checkLang() {
    localStorage.getItem('lang') === 'ru' ? localStorage.setItem('lang', 'en') : localStorage.setItem('lang', 'ru');
=======
  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    if (localStorage.getItem('lang') === null) {
      this.lang = 'ru';
      localStorage.setItem('lang', 'ru');
      this.name = true;
      return;
    }

    if (localStorage.getItem('lang') === 'en' || this.name === false) {
      localStorage.setItem('lang', 'en');
      this.name = false;
    } else {
      localStorage.setItem('lang', 'ru');
      this.name = true;
    }
  }

  checkLang(event: any) {
    this.lang = event.target.checked === false ? 'en' : 'ru';
    event.target.checked === false
      ? localStorage.setItem('lang', 'en')
      : localStorage.setItem('lang', 'ru');
>>>>>>> 7e00d73e488159b3f1c0871b279556ab6d2e5c08
  }
}
