import { IColumn } from 'src/app/board/model/board.model';
import {
  INewBoard,
  IBoardID,
} from './../../board/components/crate-board/model/newBoard.model';
import { IBoard, IBoardData } from './../../board/model/board.model';
import { createAction, props } from '@ngrx/store';
export const BOARD_KEY = 'boards';
export const CURRENT_BOARD_KEY = 'current_board';

export const BoardActions = {
  load: createAction('[BOARD] load all board'),
  loadSuccess: createAction(
    '[BOARD] success load all board',
    props<{ response: TBoardState }>()
  ),
  add: createAction('[BOARD] add board', props<{ response: INewBoard }>()),
  addSuccess: createAction(
    '[BOARD] success add board',
    props<{ response: IBoard }>()
  ),
  update: createAction('[BOARD] update board', props<{ response: IBoard }>()),
  updateSuccess: createAction(
    '[BOARD] success update board',
    props<{ response: IBoard }>()
  ),
  delete: createAction('[BOARD] delete board', props<{ response: IBoardID }>()),
  deleteSuccess: createAction(
    '[BOARD] success delete board',
    props<{ response: IBoardID }>()
  ),
  get: createAction(
    '[CURRENT_BOARD] get board data',
    props<{ response: IBoardID }>()
  ),
  getSuccess: createAction(
    '[CURRENT_BOARD] success get board data',
    props<{ response: IBoardData }>()
  ),
  dropColumn: createAction(
    '[CURRENT_BOARD] drop column',
    props<{ response: IColumn[] }>()
  ),
};

export const initialBoardState: TBoardState = [];
export const initialCurrentBoardState: TCurrentBoardState = undefined;

export type TBoardState = IBoard[];
export type TCurrentBoardState = IBoardData | undefined;

export type TDropELement = {
  previousIndex: number;
  currentIndex: number;
};
