import { IBoardID } from './../../board/components/crate-board/model/newBoard.model';
import { IColumn, INewColumn } from './../../board/model/board.model';
import { createAction, props } from '@ngrx/store';
export const COLUMN_KEY = 'column';

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
  // update: createAction('[COLUMN] update board', props<{ response: IBoard }>()),
  // updateSuccess: createAction(
  //   '[BOARD] success update board',
  //   props<{ response: IBoard }>()
  // ),
  delete: createAction(
    '[COLUMN] delete column',
    props<{ response: IBoardID }>()
  ),
  deleteSuccess: createAction(
    '[COLUMN] success delete column',
    props<{ response: IBoardID }>()
  ),
  // get: createAction('[BOARD] get board data', props<{ response: IBoardID }>()),
  // getSuccess: createAction(
  //   '[BOARD] success get board data',
  //   props<{ response: IBoardData }>()
  // ),
};

export const initialColumnState: TColumnState = [];
// export const initialCurrentBorderState: TCurrentBoardState = undefined;

export type TColumnState = IColumn[];
// export type TCurrentBoardState = IBoardData | undefined;
