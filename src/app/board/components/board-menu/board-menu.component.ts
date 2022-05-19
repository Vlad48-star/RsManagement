import { IBoardMenu } from './model/board-menu.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LangChangeService } from 'src/app/core/services/lang-change.service';

@Component({
  selector: 'app-board-menu',
  templateUrl: './board-menu.component.html',
  styleUrls: ['./board-menu.component.scss'],
})
export class BoardMenuComponent implements OnInit, OnDestroy {
  constructor(
    private activateRoute: ActivatedRoute,
    public auth: LangChangeService
  ) {}
  urlSubscription!: Subscription;

  urlParams: IBoardMenu = {};
  ngOnInit(): void {
    this.urlSubscription = this.activateRoute.params.subscribe(
      (params): IBoardMenu => (this.urlParams = { ...params })
    );
  }
  ngOnDestroy(): void {
    this.urlSubscription.unsubscribe();
  }
}
