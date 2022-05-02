import {
  initialBoardState,
  BoardActions,
  TBoardState,
} from './../actions/board.action';
import { createReducer, on } from '@ngrx/store';

export const boardReducer = createReducer(
  initialBoardState,
  on(BoardActions.loadSuccess, (state, { response }): TBoardState => response),
  on(
    BoardActions.addSuccess,
    (state, { response }): TBoardState => [...state, response]
  )
);
