import {
  TColumnState,
  COLUMN_KEY,
  CURRENT_COLUMN_KEY,
  TCurrentColumnState,
} from './../actions/column.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectColumnFeature =
  createFeatureSelector<TColumnState>(COLUMN_KEY);
export const selectAllColumn = createSelector(
  selectColumnFeature,
  (state) => state
);
export const selectCurrentColumnFeature =
  createFeatureSelector<TCurrentColumnState>(CURRENT_COLUMN_KEY);
export const selectCurrentColumn = createSelector(
  selectCurrentColumnFeature,
  (state) => state
);
