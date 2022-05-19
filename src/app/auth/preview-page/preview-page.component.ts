import { Component } from '@angular/core';
import { LangChangeService } from 'src/app/core/services/lang-change.service';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.scss'],
})
export class PreviewPageComponent {
  constructor(public auth: LangChangeService) {}

  ngOnInit() {
    this.auth.lang = localStorage.getItem('lang');
  }
}
