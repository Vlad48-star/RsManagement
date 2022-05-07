import { createAction, props } from '@ngrx/store';

export const TASK_KEY = 'task';

export const TaskActions = {
  createTask: createAction(
    '[TASK] create task',
    props<{ response: INewTaskForm; columnId: string }>()
  ),
  createTaskSuccess: createAction(
    '[TASK] create task success',
    props<{ response: ITaskRes }>()
  ),
};

export type TUserState = INewTask | object;

export interface INewTaskForm {
  title: string;
  order: number;
  description: string;
}
export interface INewTask {
  title: string;
  order: number;
  description: string;
  userId: string;
}

export interface ITaskRes {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}
