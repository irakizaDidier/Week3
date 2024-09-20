import { createReducer, on } from '@ngrx/store';
import { Task, Board } from '../../models/task';
import * as TaskActions from '../actions/task.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface TaskState extends EntityState<Task> {
  loading: boolean;
  error: string | null;
  selectedTaskId: string | null;
  boards: Board[];
}

export const adapter = createEntityAdapter<Task>({
  selectId: (task: Task) => task.id,
});

export const initialState: TaskState = adapter.getInitialState({
  loading: false,
  error: null,
  selectedTaskId: null,
  boards: [],
});

export const taskReducer = createReducer(
  initialState,

  // Handle task loading
  on(TaskActions.loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Handle task loading success
  on(TaskActions.loadTasksSuccess, (state, { boards }) => ({
    ...state,
    boards,
    loading: false,
  })),

  // Handle task loading failure
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add a task
  on(TaskActions.addTask, (state, { task }) => adapter.addOne(task, state)),

  // Update task status or other fields
  on(TaskActions.updateTask, (state, { task }) => {
    return adapter.updateOne({ id: task.id, changes: task }, state);
  }),

  // Remove a task
  on(TaskActions.deleteTask, (state, { taskId }) =>
    adapter.removeOne(taskId, state)
  ),

  // Update subtask status
  on(
    TaskActions.updateSubtaskStatus,
    (state, { taskId, subtaskId, isCompleted }) => {
      const task = state.entities[taskId];
      if (task) {
        const updatedSubtasks = task.subtasks.map((subtask) =>
          subtask.id === subtaskId ? { ...subtask, isCompleted } : subtask
        );
        return adapter.updateOne(
          { id: taskId, changes: { subtasks: updatedSubtasks } },
          state
        );
      }
      return state;
    }
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
