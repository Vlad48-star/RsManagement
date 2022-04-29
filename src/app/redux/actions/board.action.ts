import { IBoard } from './../../board/model/board.model';
import { createAction, props } from '@ngrx/store';
export const BOARD_KEY = 'board';

export const BoardActions = {
  get: createAction('[BOARD] get all card', props<{ response: TBoardState }>()),
  add: createAction('[BOARD] add card', props<{ response: IBoard }>()),
};
export const initialBoardState: TBoardState = [];
export type TBoardState = IBoard[];
