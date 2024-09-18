import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TaskState, adapter } from '../reducers/task.reducers';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const {
  selectAll: selectAllTasks,
  selectEntities: selectTaskEntities,
  selectIds: selectTaskIds,
  selectTotal: selectTaskTotal,
} = adapter.getSelectors(selectTaskState);

export const selectTaskLoading = createSelector(
  selectTaskState,
  (state: TaskState) => state.loading
);

export const selectTaskError = createSelector(
  selectTaskState,
  (state: TaskState) => state.error
);

export const selectTaskById = (taskId: string) =>
  createSelector(selectTaskEntities, (entities) => entities[taskId]);

export const selectAllBoards = createSelector(
  selectTaskState,
  (state: TaskState) => state.boards
);
