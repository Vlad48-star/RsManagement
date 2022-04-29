import { BOARD_KEY, TBoardState } from './../actions/board.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectBoardFeature = createFeatureSelector<TBoardState>(BOARD_KEY);
export const selectBoard = createSelector(selectBoardFeature, (state) => state);
