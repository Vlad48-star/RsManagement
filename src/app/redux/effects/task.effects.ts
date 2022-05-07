import { BoardActions } from './../actions/board.action';
import { selectUser } from './../selectors/user.selector';
import { selectCurrentBoard } from './../selectors/board.selector';
import { Store } from '@ngrx/store';
import { TaskActions } from './../actions/task.action';
import { RequestsService } from '../../core/services/requests.service';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { retry, map, catchError, EMPTY, mergeMap } from 'rxjs';

@Injectable()
export class TaskEffects {
  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.createTask),
      concatLatestFrom(() => [
        this.store.select(selectCurrentBoard),
        this.store.select(selectUser),
      ]),
      mergeMap(([actions, currentBoard, user]) => {
        if (currentBoard == undefined) {
          throw Error('Current board not founded.');
        }
        if (!('id' in user)) {
          throw Error('Current user not founded.');
        }
        if (user.id == undefined) {
          throw Error('Current id in user not founded.');
        }

        return this.requestsService
          .addTask(
            { ...actions.response, userId: user.id },
            { id: currentBoard?.id },
            { id: actions.columnId }
          )
          .pipe(
            retry(4),
            map((result) => {
              return TaskActions.createTaskSuccess({
                response: result,
              });
            }),
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
      ofType(TaskActions.createTaskSuccess),
      map((actions) =>
        BoardActions.get({ response: { id: actions.response.boardId } })
      )
    );
  });

  constructor(
    private actions$: Actions,
    private requestsService: RequestsService,
    private store: Store
  ) {}
}
