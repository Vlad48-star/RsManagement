import { AuthService } from './../../core/services/auth.service';
import { UserActions } from './../actions/user.action';
import { RequestsService } from '../../core/services/requests.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, EMPTY, mergeMap, retry } from 'rxjs';
import { MaterialService } from 'src/app/auth/class/material.service';

@Injectable()
export class UserEffects {
  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.registerUser),
      mergeMap((actions) => {
        return this.requestsService.register({ ...actions.response }).pipe(
          retry(4),
          map(() => {
            return UserActions.registerUserSuccess({
              response: { ...actions.response },
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

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loginUser),
      mergeMap((actions) => {
        return this.requestsService.login({ ...actions.response }).pipe(
          retry(4),
          map((token) => {
            this.authService.setSession(token, actions.response.login);
            return UserActions.loginUserSuccess({
              response: { ...actions.response },
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

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.load),
      mergeMap(() =>
        this.requestsService.loadAllUsers().pipe(
          retry(4),
          map((response) => {
            console.log(response);
            const item = response.find(
              (response) => response.login == localStorage.getItem('login')
            );
            if (item == undefined) {
              throw new Error('User not founded');
            }
            return UserActions.loadSuccess({ response: item });
          }),
          catchError((error) => {
            console.log(error);
            MaterialService.toast(error.error.message);
            return EMPTY;
          })
        )
      )
    );
  });

  loginAfterRegistration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.registerUserSuccess),
      map((action) =>
        UserActions.loginUser({
          response: action.response,
        })
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.update),
      mergeMap((actions) => {
        return this.requestsService
          .update({ ...actions.response }, actions.id)
          .pipe(
            map((response) => {
              localStorage.setItem('login', response.login);
              return UserActions.updateSuccess({
                response: { ...actions.response },
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

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.delete),
      mergeMap((actions) => {
        return this.requestsService.delete(actions.id).pipe(
          map(() => {
            return UserActions.deleteSuccess();
          }),
          catchError((error) => {
            MaterialService.toast(error.error.message);
            return EMPTY;
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private requestsService: RequestsService,
    private authService: AuthService
  ) {}
}
