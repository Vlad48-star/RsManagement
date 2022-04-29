import { boardReducer } from './board.reducer';
import { BOARD_KEY, TBoardState } from './../actions/board.action';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';

export interface State {
  [BOARD_KEY]: TBoardState;
}

export const reducers: ActionReducerMap<State> = {
  [BOARD_KEY]: boardReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
