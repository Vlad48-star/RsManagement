import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LangChangeService } from 'src/app/core/services/lang-change.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent {
  constructor(public auth: LangChangeService) {}
  selected = 'option2';
  qwe() {
    console.log(this.selected);
  }
}
