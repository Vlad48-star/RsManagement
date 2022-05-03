import { columnReducer } from './column.reducer';
import { COLUMN_KEY, TColumnState } from './../actions/column.action';
import { boardReducer, borderItemReducer } from './board.reducer';
import {
  BOARD_KEY,
  CURRENT_BOARD_KEY,
  TBoardState,
  TCurrentBoardState,
} from './../actions/board.action';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';

export interface State {
  [BOARD_KEY]: TBoardState;
  [CURRENT_BOARD_KEY]: TCurrentBoardState;
  [COLUMN_KEY]: TColumnState;
}

export const reducers: ActionReducerMap<State> = {
  [BOARD_KEY]: boardReducer,
  [CURRENT_BOARD_KEY]: borderItemReducer,
  [COLUMN_KEY]: columnReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
