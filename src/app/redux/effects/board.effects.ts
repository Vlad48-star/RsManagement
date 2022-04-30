import { BoardActions } from './../actions/board.action';
import { RequestsService } from './../../core/services/requests.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, EMPTY, map, retry } from 'rxjs';

@Injectable()
export class BoardEffects {
  loadBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.load),
      exhaustMap(() =>
        this.requestsService.getBoardData().pipe(
          retry(4),
          map((response) => {
            return BoardActions.loadSuccess({ response });
          }),
          catchError((error) => {
            console.log('[ERROR]: ', error);
            return EMPTY;
          })
        )
      )
    );
  });
  addNewBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.add),
      exhaustMap((action) => {
        return this.requestsService.addBoard(action.response.title).pipe(
          retry(4),
          map((response) => BoardActions.addSuccess({ response })),
          catchError((error) => {
            console.log('[ERROR]: ', error);
            return EMPTY;
          })
        );
      })
    );
  });
  constructor(
    private actions$: Actions,
    public requestsService: RequestsService
  ) {}
}
