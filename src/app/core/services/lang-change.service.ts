import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LangChangeService implements OnInit {
  lang!: string | null;
  statusLang!: boolean;

  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    if (localStorage.getItem('lang') === null) {
      this.lang = 'ru';
      localStorage.setItem('lang', 'ru');
      this.statusLang = true;
      return;
    }
    if (localStorage.getItem('lang') === 'en' || this.statusLang === false) {
      localStorage.setItem('lang', 'en');
      this.statusLang = false;
    } else {
      localStorage.setItem('lang', 'ru');
      this.statusLang = true;
    }
  }

  checkLang(event: any) {
    this.lang = event.target.checked === false ? 'en' : 'ru';
    event.target.checked === false
      ? localStorage.setItem('lang', 'en')
      : localStorage.setItem('lang', 'ru');
  }
}
