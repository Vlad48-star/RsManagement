import { INewBoard } from './../../board/components/crate-board/model/newBoard.model';
import { IBoard } from './../../board/model/board.model';
import { createAction, props } from '@ngrx/store';
export const BOARD_KEY = 'board';

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
};
export const initialBoardState: TBoardState = [];
export type TBoardState = IBoard[];
