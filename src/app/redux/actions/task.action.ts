import { IColumn } from 'src/app/board/model/board.model';
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
  updateTask: createAction(
    '[TASK] update task',
    props<{ response: ITaskUpdate }>()
  ),
  updateTaskSuccess: createAction(
    '[TASK] update task success',
    props<{ response: ITaskUpdate }>()
  ),
  deleteTask: createAction(
    '[TASK] delete task',
    props<{ response: { columnId: string; taskId: string } }>()
  ),
  deleteTaskSuccess: createAction(
    '[TASK] delete task success',
    props<{ response: { columnId: string; taskId: string } }>()
  ),
};

export type TUserState = INewTask | object;

export interface INewTaskForm {
  title: string;
  order: number;
  description: string;
  done: boolean;
}
export interface INewTask extends INewTaskForm {
  title: string;
  order: number;
  description: string;
  userId: string;
}

export interface ITaskUpdate extends INewTask {
  id: string;
  columnId?: string;
}

export interface ITaskRes extends ITaskUpdate {
  columnId: string;
}
