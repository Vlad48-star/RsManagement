import { selectAllColumn } from './../selectors/column.selector';
import { IColumn } from './../../board/model/board.model';
import { Store } from '@ngrx/store';
import { BoardActions } from './../actions/board.action';
import { RequestsService } from './../../core/services/requests.service';
import { ColumnActions } from './../actions/column.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { selectCurrentBoard } from '../selectors/board.selector';

import {
  retry,
  map,
  catchError,
  EMPTY,
  mergeMap,
  exhaustMap,
  first,
  debounceTime,
  of,
} from 'rxjs';
import { MaterialService } from 'src/app/auth/class/material.service';

@Injectable()
export class ColumnEffects {
  currentBoardId!: string;
  currentColumnList!: IColumn[];

  getCurrentBoardId() {
    this.store.select(selectCurrentBoard).subscribe((res) => {
      if (res) {
        this.currentBoardId = res!.id;
      }
    });
  }
  getCurrentColumnList() {
    this.store.select(selectAllColumn).subscribe((res) => {
      if (res) {
        this.currentColumnList = res;
      }
    });
  }

  updateColumnsOrder(columnList: IColumn[]) {
    columnList.map((column: IColumn) => {
      if (column.order !== columnList.indexOf(column)) {
        console.log('do smth');
      }
    });
  }

  loadColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.load),
      mergeMap((actions) =>
        this.requestsService.loadAllColumn({ id: actions.response.id }).pipe(
          retry(4),
          map((response) => {
            return ColumnActions.loadSuccess({ response });
          }),
          catchError((error) => {
            MaterialService.toast(error.error.message);
            return EMPTY;
          })
        )
      )
    );
  });

  addColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.add),
      mergeMap((action) => {
        return this.requestsService
          .addColumn({ ...action.response }, { ...action.id })
          .pipe(
            retry(4),
            map((response) =>
              ColumnActions.addSuccess({ response, id: action.id })
            ),
            catchError((error) => {
              MaterialService.toast(error.error.message);
              return EMPTY;
            })
          );
      })
    );
  });
  updateColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.update),
      exhaustMap((actions) => {
        return this.requestsService.updateColumn(actions.response);
      }),
      retry(4),
      map((response) => ColumnActions.updateSuccess({ response })),
      catchError((error) => {
        MaterialService.toast(error.error.message);
        return EMPTY;
      })
    );
  });
  // updateCurrentBoard$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ColumnActions.addSuccess),
  //     map((actions) => BoardActions.get({ response: actions.id }))
  //   );
  // });
  updateCurrentBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.addSuccess),
      map((actions) => BoardActions.get({ response: actions.id }))
    );
  });

  updateCurrentBoardColumn$ = createEffect(() => {
    this.getCurrentBoardId();
    return this.actions$.pipe(
      ofType(ColumnActions.updateSuccess),
      map(() => BoardActions.get({ response: { id: this.currentBoardId } }))
    );
  });

  deleteColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.delete),
      mergeMap((actions) =>
        this.requestsService.deleteColumn(actions.response).pipe(
          map(() => {
            return ColumnActions.deleteSuccess({
              response: actions.response,
            });
          }),
          catchError((error) => {
            MaterialService.toast(error.error.message);
            return EMPTY;
          })
        )
      )
    );
  });

  updateCurrentColumn$ = createEffect(() => {
    this.getCurrentBoardId();
    return this.actions$.pipe(
      ofType(ColumnActions.deleteSuccess),
      concatLatestFrom(() => this.store.select(selectAllColumn)),
      mergeMap(([deleteResponse, columnSelector]) => {
        console.log(deleteResponse, columnSelector);
        if (columnSelector.length == 0) return of([]);
        return columnSelector.map((el, index) => {
          console.log(el.order, index + 1);
          if (el.order == index + 1) {
            return null;
          }
          return this.requestsService
            .updateColumn({
              title: el.title,
              order: index + 1,
              id: el.id,
            })
            .pipe(first())
            .subscribe();
        });
      }),
      debounceTime(300),
      map((param) => {
        console.log(param);
        return ColumnActions.successUpdateCurrentColumnOrder();
      }),
      catchError((error) => {
        console.log(error);
        MaterialService.toast(error.error.message);
        return EMPTY;
      })
    );
  });

  updateCurrentBoardAfterOrderUpdate$ = createEffect(() => {
    this.getCurrentBoardId();
    return this.actions$.pipe(
      ofType(ColumnActions.successUpdateCurrentColumnOrder),
      map(() => BoardActions.get({ response: { id: this.currentBoardId } }))
    );
  });

  updateColumnsAfterDnD$ = createEffect(() => {
    this.getCurrentBoardId();
    return this.actions$.pipe(
      ofType(BoardActions.dropColumn),
      mergeMap(({ response }) =>
        response.map((el, index) => {
          console.log(el.order, index + 1);
          return this.requestsService
            .updateColumn({
              title: el.title,
              order: response[response.length - 1].order + index + 1,
              id: el.id,
            })
            .pipe(first())
            .subscribe();
        })
      ),
      debounceTime(300),
      map(() => {
        return ColumnActions.successUpdateCurrentColumnOrder();
      })
    );
  });

  constructor(
    private actions$: Actions,
    private requestsService: RequestsService,
    private store: Store
  ) {}
}
