import {
  initialUserState,
  UserActions,
  TUserState,
} from './../actions/user.action';
import { createReducer, on } from '@ngrx/store';

export const userReducer = createReducer(
  initialUserState,

  on(UserActions.loginUserSuccess, (state, { response }): TUserState => {
    return { ...state, login: response.login };
  }),

  on(UserActions.loadSuccess, (state, { response }): TUserState => {
    return response;
  }),

  on(UserActions.deleteSuccess,(state): TUserState => {
    return initialUserState
  }),

);
