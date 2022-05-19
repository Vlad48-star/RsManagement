import { USER_KEY, TUserState } from './../actions/user.action';
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
import { userReducer } from './user.reducer';

export interface State {
  [USER_KEY]: TUserState;
  [BOARD_KEY]: TBoardState;
  [CURRENT_BOARD_KEY]: TCurrentBoardState;
  [CURRENT_COLUMN_KEY]: TCurrentColumnState;
  [COLUMN_KEY]: TColumnState;
}

export const reducers: ActionReducerMap<State> = {
  [USER_KEY]: userReducer,
  [BOARD_KEY]: boardReducer,
  [CURRENT_BOARD_KEY]: boardItemReducer,
  [CURRENT_COLUMN_KEY]: columnItemReducer,
  [COLUMN_KEY]: columnReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
