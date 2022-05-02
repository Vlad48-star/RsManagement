import { Router } from '@angular/router';
import { BoardActions } from './../actions/board.action';
import { RequestsService } from './../../core/services/requests.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, EMPTY, map, retry, mergeMap, tap } from 'rxjs';

@Injectable()
export class BoardEffects {
  loadBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.load),
      exhaustMap(() =>
        this.requestsService.loadAllBoard().pipe(
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

  updateBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.update),
      exhaustMap((actions) => {
        return this.requestsService.updateBoard(actions.response);
      }),
      retry(4),
      map((response) => BoardActions.updateSuccess({ response })),
      catchError((error) => {
        console.log('[ERROR]: ', error);
        return EMPTY;
      })
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.delete),
      mergeMap((actions) =>
        this.requestsService.deleteBoard(actions.response).pipe(
          map(() => {
            return BoardActions.deleteSuccess({ response: actions.response });
          }),
          tap(() => this.router.navigate(['board'])),
          catchError((error) => {
            console.log('[ERROR]: ', error);
            return EMPTY;
          })
        )
      )
    );
  });

  getBorderData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.get),
      exhaustMap((actions) => {
        return this.requestsService.getBoardData(actions.response);
      }),
      retry(4),
      map((response) => BoardActions.getSuccess({ response })),
      catchError((error) => {
        console.log('[ERROR]: ', error);
        return EMPTY;
      })
    );
  });

  constructor(
    private actions$: Actions,
    public requestsService: RequestsService,
    private router: Router
  ) {}
}
