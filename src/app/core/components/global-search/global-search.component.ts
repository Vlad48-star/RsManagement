import { Observable } from 'rxjs';
import { UserActions, IUsers } from 'src/app/redux/actions/user.action';
import { Store } from '@ngrx/store';
import { RequestsService } from 'src/app/core/services/requests.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LangChangeService } from 'src/app/core/services/lang-change.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent {
  constructor(
    public auth: LangChangeService,
    private req: RequestsService,
    private store: Store
  ) {}
  searchValue!: string;
  selected = 'option2';
  allUsers!: Observable<IUsers[]>;
  onSeacrh() {
    console.log(this.selected);
    console.log(this.searchValue);
    this.store.dispatch(UserActions.loadAllUsers());
  }
}
