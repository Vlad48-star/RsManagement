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
}

export const reducers: ActionReducerMap<State> = {
  [BOARD_KEY]: boardReducer,
  [CURRENT_BOARD_KEY]: borderItemReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
