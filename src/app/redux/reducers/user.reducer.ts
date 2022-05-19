import { IUser, IUsers } from 'src/app/redux/actions/user.action';
import {
  initialUserState,
  UserActions,
  TUserState,
  initialAllUsersState,
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

  on(UserActions.deleteSuccess, (state): TUserState => {
    return initialUserState;
  })
);
export const allUsersReducer = createReducer(
  initialAllUsersState,
  on(UserActions.loadAllUsersSuccess, (state, { response }): IUsers[] => [
    ...response,
  ])
);
