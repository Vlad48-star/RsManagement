import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.scss'],
})
export class PreviewPageComponent {

  constructor(public router: Router) {}

  checkLang() {
    localStorage.getItem('lang') === 'ru' ? localStorage.setItem('lang', 'en') : localStorage.setItem('lang', 'ru');
  }

}
