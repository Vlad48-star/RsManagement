import { TColumnState, COLUMN_KEY } from './../actions/column.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectColumnFeature =
  createFeatureSelector<TColumnState>(COLUMN_KEY);
export const selectAllColumn = createSelector(
  selectColumnFeature,
  (state) => state
);
