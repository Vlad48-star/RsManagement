import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.scss'],
})
export class PreviewPageComponent {
  name: boolean | undefined;
  lang: string | null = null;
  constructor(public router: Router) {}

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
  }
}
