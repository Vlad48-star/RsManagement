import { IBoardID } from './../../board/components/crate-board/model/newBoard.model';
import {
  IColumn,
  INewColumn,
  IBoard,
  IColumnUpdate,
} from './../../board/model/board.model';
import { createAction, props } from '@ngrx/store';
export const COLUMN_KEY = 'column';
export const CURRENT_COLUMN_KEY = 'current_column';

export const ColumnActions = {
  load: createAction(
    '[COLUMN] load all column',
    props<{ response: IBoardID }>()
  ),
  loadSuccess: createAction(
    '[COLUMN] success load all column',
    props<{ response: IColumn[] }>()
  ),
  add: createAction(
    '[COLUMN] add column',
    props<{ response: INewColumn; id: IBoardID }>()
  ),
  addSuccess: createAction(
    '[COLUMN] success add column',
    props<{ response: IColumn; id: IBoardID }>()
  ),
  update: createAction(
    '[COLUMN] update column',
    props<{ response: IColumnUpdate }>()
  ),
  updateSuccess: createAction(
    '[COLUMN] success update column',
    props<{ response: IColumnUpdate }>()
  ),
  delete: createAction(
    '[COLUMN] delete column',
    props<{ response: IBoardID }>()
  ),
  deleteSuccess: createAction(
    '[COLUMN] success delete column',
    props<{ response: IBoardID }>()
  ),
  updateCurrentColumn: createAction(
    '[CURRENT_COLUMN] update column',
    props<{ currentColumn: IColumn }>()
  ),
  updateCurrentColumnOrder: createAction(
    '[CURRENT_COLUMN] update order column',
    props<{ currentColumn: IColumnUpdate; index: number }>()
  ),
  successUpdateCurrentColumnOrder: createAction(
    '[CURRENT_COLUMN] update order column success'
  ),
  // get: createAction('[BOARD] get board data', props<{ response: IBoardID }>()),
  // getSuccess: createAction(
  //   '[BOARD] success get board data',
  //   props<{ response: IBoardData }>()
  // ),
};

export const initialColumnState: TColumnState = [];
export const initialCurrentColumnState: TCurrentColumnState = undefined;

export type TColumnState = IColumn[];
export type TCurrentColumnState = IColumn | undefined;
