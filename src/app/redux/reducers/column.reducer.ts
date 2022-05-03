import {
  initialColumnState,
  TColumnState,
  ColumnActions,
} from './../actions/column.action';
import { createReducer, on } from '@ngrx/store';

export const columnReducer = createReducer(
  initialColumnState,
  on(
    ColumnActions.loadSuccess,
    (state, { response }): TColumnState => response
  ),
  on(
    ColumnActions.addSuccess,
    (state, { response }): TColumnState => [...state, response]
  )
);
