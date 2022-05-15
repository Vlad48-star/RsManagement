import { Component } from '@angular/core';
import { LangChangeService } from '../../services/lang-change.service';

@Component({
  selector: 'app-toggler',
  templateUrl: './toggler.component.html',
  styleUrls: ['./toggler.component.scss'],
})
export class TogglerComponent {
  constructor(public auth: LangChangeService) {}

  ngOnInit() {
    localStorage.getItem('lang') === 'ru'
      ? (this.auth.statusLang = true)
      : (this.auth.statusLang = false);
  }

  checkLang(event: any) {
    this.auth.checkLang(event);
  }
}
