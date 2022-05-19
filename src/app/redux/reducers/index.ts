import { USER_KEY, TUserState, TAllUsersState, USER_SEARCH } from './../actions/user.action';
import { columnItemReducer, columnReducer } from './column.reducer';
import {
  COLUMN_KEY,
  TColumnState,
  CURRENT_COLUMN_KEY,
  TCurrentColumnState,
} from './../actions/column.action';
import { boardReducer, boardItemReducer } from './board.reducer';
import {
  BOARD_KEY,
  CURRENT_BOARD_KEY,
  TBoardState,
  TCurrentBoardState,
} from './../actions/board.action';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { userReducer, allUsersReducer } from './user.reducer';

export interface State {
  [USER_KEY]: TUserState;
  [BOARD_KEY]: TBoardState;
  [CURRENT_BOARD_KEY]: TCurrentBoardState;
  [CURRENT_COLUMN_KEY]: TCurrentColumnState;
  [COLUMN_KEY]: TColumnState;
  [USER_SEARCH]: TAllUsersState;
}

export const reducers: ActionReducerMap<State> = {
  [USER_KEY]: userReducer,
  [BOARD_KEY]: boardReducer,
  [CURRENT_BOARD_KEY]: boardItemReducer,
  [CURRENT_COLUMN_KEY]: columnItemReducer,
  [COLUMN_KEY]: columnReducer,
  [USER_SEARCH]: allUsersReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
