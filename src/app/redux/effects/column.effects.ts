import { BoardActions } from './../actions/board.action';
import { RequestsService } from './../../core/services/requests.service';
import { ColumnActions } from './../actions/column.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { retry, map, catchError, EMPTY, mergeMap, exhaustMap } from 'rxjs';

@Injectable()
export class ColumnEffects {
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

  updateCurrentBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.addSuccess),
      map((actions) => BoardActions.get({ response: actions.id }))
    );
  });

  constructor(
    private actions$: Actions,
    private requestsService: RequestsService
  ) {}
}
