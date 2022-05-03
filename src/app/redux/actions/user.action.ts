import { createAction, props } from '@ngrx/store';

export const USER_KEY = 'user';

export const BoardActions = {
  load: createAction('[USER] get all user data'),
  loadSuccess: createAction(
    '[USER] success get all user data',
    props<{ response: IUsers[] }>()
  ),
};

export interface IUsers {
  id: string;
  name: string;
  login: string;
}
