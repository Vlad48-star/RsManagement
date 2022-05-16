import { IColumn } from './../../board/model/board.model';
import { select, Store } from '@ngrx/store';
import { TaskActions } from './../actions/task.action';
import { BoardActions } from './../actions/board.action';
import { RequestsService } from './../../core/services/requests.service';
import { ColumnActions } from './../actions/column.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  retry,
  map,
  catchError,
  EMPTY,
  mergeMap,
  exhaustMap,
  first,
  concatMap,
  withLatestFrom,
  of,
  tap,
  debounce,
  debounceTime,
  switchMap,
} from 'rxjs';
import { selectCurrentBoard } from '../selectors/board.selector';
import { selectAllColumn } from '../selectors/column.selector';

@Injectable()
export class ColumnEffects {
  currentBoardId!: string;

  getCurrentBoardId() {
    this.store.select(selectCurrentBoard).subscribe((res) => {
      if (res) {
        this.currentBoardId = res!.id;
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
            console.log('[ERROR]: ', error);
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
              console.log('[ERROR]: ', error);
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
        console.log(actions);
        return this.requestsService.updateColumn(actions.response);
      }),
      retry(4),
      map((response) => ColumnActions.updateSuccess({ response })),
      catchError((error) => {
        console.log('[ERROR]: ', error);
        return EMPTY;
      })
    );
  });
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
            return ColumnActions.deleteSuccess({ response: actions.response });
          }),
          catchError((error) => {
            console.log('[ERROR]: ', error);
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
      withLatestFrom(this.store.select(selectAllColumn)),
      mergeMap(([deleteResponse, columnSelector]) =>
        columnSelector.map((el, index) => {
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
        })
      ),
      debounceTime(300),
      map((param) => {
        return ColumnActions.successUpdateCurrentColumnOrder();
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
  constructor(
    private actions$: Actions,
    private requestsService: RequestsService,
    private store: Store
  ) {}
}
