import { BoardActions } from './../actions/board.action';
import { selectUser } from './../selectors/user.selector';
import {
  selectCurrentBoard,
  selectCurrentBoardColumnTask,
} from './../selectors/board.selector';
import { Store, select } from '@ngrx/store';
import { TaskActions } from './../actions/task.action';
import { RequestsService } from '../../core/services/requests.service';
import { Injectable, Pipe } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import {
  retry,
  map,
  catchError,
  EMPTY,
  mergeMap,
  exhaustMap,
  first,
  debounceTime,
} from 'rxjs';
import { MaterialService } from 'src/app/auth/class/material.service';

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
              MaterialService.toast(error.error.message);
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
        return this.requestsService.updateTask(
          actions.response,
          actions.newColumnId
        );
      }),
      retry(4),
      map((response) => TaskActions.updateTaskSuccess({ response })),
      catchError((error) => {
        MaterialService.toast(error.error.message);
        return EMPTY;
      })
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap((actions) =>
        this.requestsService.deleteTask(actions.response).pipe(
          map(() => {
            return TaskActions.deleteTaskSuccess({
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

  dropTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.dropTask),
      mergeMap(({ response, columnId }) =>
        response.map((el, index) => {
          console.log(el.order, index + 1);

          // const { title, order, description, userId, columnId, done, id } = el;

          return this.requestsService
            .updateTask({ ...el, order: index, columnId })
            .pipe(first())
            .subscribe();
        })
      ),
      debounceTime(300),
      map(() => {
        return TaskActions.dropTaskSuccess();
      })
    );
  });

  dropTaskFromAnotherColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.dropTaskToAnotherColumn),
      mergeMap((actions) => {
        return this.requestsService.updateTask(
          actions.response,
          actions.newColumnId
        );
      }),
      retry(4),
      map((response) => {
        const { columnId } = response;
        console.log(response);
        // return TaskActions.updateOrderInColumn({ response: columnId });
        return TaskActions.dropTaskToAnotherColumnSuccess();
      }),
      catchError((error) => {
        MaterialService.toast(error.error.message);
        return EMPTY;
      })
    );
  });

  updateTasksAfterDnD$ = createEffect(() => {
    this.getCurrentBoardId();
    return this.actions$.pipe(
      ofType(TaskActions.updateOrderInColumn),
      concatLatestFrom(({ response }) => [
        this.store.select(selectCurrentBoardColumnTask(response)),
      ]),
      mergeMap(([columnId, response]) => {
        return response![0].tasks.map((el, index) => {
          return this.requestsService
            .updateTask({
              ...el,
              columnId: columnId.response,
              order: index + 1,
            })
            .pipe(first())
            .subscribe();
        });
      }),
      debounceTime(300),
      map(() => {
        return TaskActions.updateOrderInColumnSuccess();
      })
    );
  });
  // dropTaskToAnotherColumn$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TaskActions.dropTaskToAnotherColumn),
  //     // mergeMap(({ fromColumn, toColumn }) =>
  //     //   response.map((el, index) => {
  //     //     console.log(el.order, index + 1);

  //     //     // const { title, order, description, userId, columnId, done, id } = el;

  //     //     return this.requestsService
  //     //       .updateTask({ ...el, order: index, columnId })
  //     //       .pipe(first())
  //     //       .subscribe();
  //     //   })
  //     ),
  //     debounceTime(300),
  //     map(() => {
  //       return TaskActions.dropTaskSuccess();
  //     })
  //   );
  // });

  updateCurrentBoard$ = createEffect(() => {
    this.getCurrentBoardId();
    return this.actions$.pipe(
      ofType(
        TaskActions.createTaskSuccess,
        TaskActions.updateTaskSuccess,
        TaskActions.deleteTaskSuccess,
        TaskActions.dropTaskSuccess,
        TaskActions.dropTaskToAnotherColumnSuccess
        // TaskActions.updateOrderInColumnSuccess
      ),
      map(() => BoardActions.get({ response: { id: this.currentBoardId } }))
    );
  });

  constructor(
    private actions$: Actions,
    private requestsService: RequestsService,
    private store: Store
  ) {}
}
