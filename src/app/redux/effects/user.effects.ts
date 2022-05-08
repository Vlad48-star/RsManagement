import { AuthService } from './../../core/services/auth.service';
import { UserActions } from './../actions/user.action';
import { RequestsService } from '../../core/services/requests.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { retry, map, catchError, EMPTY, mergeMap } from 'rxjs';
import { MaterialService } from 'src/app/auth/class/material.service';



@Injectable()
export class UserEffects {
  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.registerUser),
      mergeMap((actions) => {
        return this.requestsService.register({ ...actions.response }).pipe(
          map(() => {
            return UserActions.registerUserSuccess({
              response: { ...actions.response },
            });
          }),
          catchError((error) => {
            MaterialService.toast(error.error.message)
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
          map((response) => {
            const item = response.find(
              (response) => response.login == localStorage.getItem('login')
            );
            if (item == undefined) {
              throw new Error('User not founded');
            }
            return UserActions.loadSuccess({ response: item });
          }),
          catchError((error) => {
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

  constructor(
    private actions$: Actions,
    private requestsService: RequestsService,
    private authService: AuthService
  ) {}
}
