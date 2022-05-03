import { IBoard } from './../../board/model/board.model';
import {
  BOARD_KEY,
  TBoardState,
  TCurrentBoardState,
  CURRENT_BOARD_KEY,
} from './../actions/board.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectBoardFeature = createFeatureSelector<TBoardState>(BOARD_KEY);
export const selectAllBoard = createSelector(
  selectBoardFeature,
  (state) => state
);
export const selectBoard = (id: string | null) =>
  createSelector(selectBoardFeature, (state) => {
    if (id == null) {
      return state;
    }
    return state.filter((elem: IBoard) => elem.id === id);
  });

export const selectCurrentBoardFeature =
  createFeatureSelector<TCurrentBoardState>(CURRENT_BOARD_KEY);

export const selectCurrentBoard = createSelector(
  selectCurrentBoardFeature,
  (state) => state
);
