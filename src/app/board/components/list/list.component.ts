import { selectBoard } from './../../../redux/selectors/board.selector';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/core/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(public dataService: DataService, private store: Store) {}
  isBoardListEmpty = true;
  boards$ = this.store.select(selectBoard);

  ngOnInit(): void {
    this.dataService.loadBoardData();
  }
}
