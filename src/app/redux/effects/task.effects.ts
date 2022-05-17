import { BoardActions } from './../actions/board.action';
import { selectUser } from './../selectors/user.selector';
import { selectCurrentBoard } from './../selectors/board.selector';
import { Store } from '@ngrx/store';
import { TaskActions } from './../actions/task.action';
import { RequestsService } from '../../core/services/requests.service';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { retry, map, catchError, EMPTY, mergeMap, exhaustMap } from 'rxjs';

@Injectable()
export class TaskEffects {
  currentBoardId!: string;
  getCurrentBoardId() {
    this.store.select(selectCurrentBoard).subscribe((res) => {
      if (res) {
        this.currentBoardId = res!.id;
      }
    });
  }
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
  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.updateTask),
      exhaustMap((actions) => {
        return this.requestsService.updateTask(actions.response);
      }),
      retry(4),
      map((response) => TaskActions.updateTaskSuccess({ response })),
      catchError((error) => {
        console.log('[ERROR]: ', error);
        return EMPTY;
      })
    );
  });
  updateCurrentBoard$ = createEffect(() => {
    this.getCurrentBoardId();
    return this.actions$.pipe(
      ofType(TaskActions.createTaskSuccess, TaskActions.updateTaskSuccess),
      map((actions) =>
        BoardActions.get({ response: { id: this.currentBoardId } })
      )
    );
  });

  constructor(
    private actions$: Actions,
    private requestsService: RequestsService,
    private store: Store
  ) {}
}
