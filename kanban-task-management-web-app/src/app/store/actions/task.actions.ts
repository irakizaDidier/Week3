import { createAction, props } from '@ngrx/store';
import { Board, Task } from '../../models/task';

export const loadTasks = createAction('[Task/API] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task/API] Load Tasks Success',
  props<{ boards: Board[] }>()
);

export const loadTasksFailure = createAction(
  '[Task/API] Load Tasks Failure',
  props<{ error: string }>()
);

export const addTask = createAction(
  '[Task/API] Add Task',
  props<{ task: Task }>()
);

export const updateTask = createAction(
  '[Task/API] Update Task',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Task/API] Delete Task',
  props<{ taskId: string }>()
);

export const updateSubtaskStatus = createAction(
  '[Subtask/API] Update Subtask Status',
  props<{ taskId: string; subtaskId: string; isCompleted: boolean }>()
);

export const createBoard = createAction(
  '[Board/API] Create Board',
  props<{ board: Board }>()
);

export const addBoard = createAction(
  '[Board/API] Add Board',
  props<{ board: Board }>()
);
