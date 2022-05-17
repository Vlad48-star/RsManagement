import { ILogin, IPerson } from './../../core/services/models/request.model';
import { createAction, props } from '@ngrx/store';

export const USER_KEY = 'user';

export const UserActions = {
  loginUser: createAction('[USER] login user', props<{ response: ILogin }>()),
  loginUserSuccess: createAction(
    '[USER] login user success',
    props<{ response: IUser }>()
  ),
  registerUser: createAction(
    '[USER] register user',
    props<{ response: IPerson }>()
  ),
  registerUserSuccess: createAction(
    '[USER] register user success',
    props<{ response: IPerson }>()
  ),
  load: createAction('[USER] get all user data'),
  loadSuccess: createAction(
    '[USER] success get all user data',
    props<{ response: IUser }>()
  ),
  update: createAction(
    '[USER] update current user',
    props<{ response: IPerson; id: string }>()
  ),
  updateSuccess: createAction(
    '[USER] success get all user data',
    props<{ response: IPerson }>()
  ),
  delete: createAction('[USER] delete', props<{ id: string }>()),
  deleteSuccess: createAction('[USER] success delete'),
};

export const initialUserState: TUserState = {
  login: localStorage.getItem('login') || null,
};

export type TUserState = IUser | object;

export interface IUser {
  login: string;
  name?: string;
  id?: string;
}
