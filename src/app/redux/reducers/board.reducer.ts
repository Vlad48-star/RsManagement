import {
  initialBoardState,
  BoardActions,
  TBoardState,
  initialCurrentBorderState,
  TCurrentBoardState,
} from './../actions/board.action';
import { createReducer, on } from '@ngrx/store';

export const boardReducer = createReducer(
  initialBoardState,
  on(BoardActions.loadSuccess, (state, { response }): TBoardState => response),
  on(
    BoardActions.addSuccess,
    (state, { response }): TBoardState => [...state, response]
  ),
  on(BoardActions.updateSuccess, (state, { response }): TBoardState => {
    const boards = state.map((board) => {
      if (board.id == response.id) {
        return response;
      }
      return board;
    });
    return boards;
  }),
  on(
    BoardActions.deleteSuccess,
    (state, { response }): TBoardState =>
      state.filter((board) => board.id !== response.id)
  )
);
export const borderItemReducer = createReducer(
  initialCurrentBorderState,
  on(
    BoardActions.getSuccess,
    (state, { response }): TCurrentBoardState => response
  )
);
