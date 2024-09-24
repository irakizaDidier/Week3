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
  selectId: (task: Task) => task.title, // Assuming title is unique
});

export const initialState: TaskState = adapter.getInitialState({
  loading: false,
  error: null,
  selectedTaskId: null,
  boards: [],
});

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TaskActions.loadTasksSuccess, (state, { boards }) => ({
    ...state,
    boards,
    loading: false,
  })),

  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TaskActions.addTask, (state, { task, boardName }) => {
    const board = state.boards.find(b => b.name === boardName);
    if (board) {
      const updatedColumns = board.columns.map(column => {
        if (column.name === task.status) {
          return {
            ...column,
            tasks: [...column.tasks, task],
          };
        }
        return column;
      });
      const updatedBoard = { ...board, columns: updatedColumns };

      return {
        ...state,
        boards: state.boards.map(b => (b.name === boardName ? updatedBoard : b)), // Replace the updated board
      };
    }

    return state;
  }),

  on(TaskActions.updateTask, (state, { task }) =>
    adapter.updateOne({ id: task.title, changes: task }, state)
  ),

  on(TaskActions.deleteTask, (state, { taskTitle }) =>
    adapter.removeOne(taskTitle, state)
  ),

  on(
    TaskActions.updateSubtaskStatus,
    (state, { taskTitle, subtaskTitle, isCompleted }) => {
      const taskEntity = state.entities[taskTitle];
      if (taskEntity) {
        const updatedSubtasks = taskEntity.subtasks.map((subtask) =>
          subtask.title === subtaskTitle ? { ...subtask, isCompleted } : subtask
        );
        return adapter.updateOne(
          { id: taskTitle, changes: { subtasks: updatedSubtasks } },
          state
        );
      }
      return state;
    }
  ),

  on(TaskActions.addBoard, (state, { board }) => ({
    ...state,
    boards: [...state.boards, board],
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
