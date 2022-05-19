import { ITask } from './../../board/model/board.model';
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
    props<{ response: ITaskUpdate; newColumnId?: string }>()
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
  dropTask: createAction(
    '[TASK] drop task',
    props<{ response: ITask[]; columnId: string }>()
  ),
  dropTaskSuccess: createAction('[TASK] drop task success'),

  dropTaskToAnotherColumn: createAction(
    '[TASK] drop task to another column',
    props<{ response: ITaskUpdate; newColumnId?: string }>()
  ),
  dropTaskToAnotherColumnSuccess: createAction(
    '[TASK] drop task to another column success'
  ),

  updateOrderInColumn: createAction(
    '[TASK]  update tasks orders',
    props<{ response: string }>()
  ),
  updateOrderInColumnSuccess: createAction(
    '[TASK] update tasks orders success'
  ),
};

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
