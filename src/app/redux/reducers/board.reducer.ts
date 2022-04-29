import {
  initialBoardState,
  BoardActions,
  TBoardState,
} from './../actions/board.action';
import { createReducer, on } from '@ngrx/store';

export const boardReducer = createReducer(
  initialBoardState,
  on(BoardActions.get, (state, { response }): TBoardState => response),
  on(
    BoardActions.add,
    (state, { response }): TBoardState => [...state, response]
  )
);
