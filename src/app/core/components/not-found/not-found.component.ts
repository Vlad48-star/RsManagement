import { Component } from '@angular/core';
import { LangChangeService } from '../../services/lang-change.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  constructor(public auth: LangChangeService){}
}
