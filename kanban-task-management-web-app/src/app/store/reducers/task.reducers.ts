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
    const board = state.boards.find((b) => b.name === boardName);
    if (board) {
      const updatedColumns = board.columns.map((column) => {
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
        boards: state.boards.map((b) =>
          b.name === boardName ? updatedBoard : b
        ), // Replace the updated board
      };
    }

    return state;
  }),

  on(
    TaskActions.updateSubtaskStatus,
    (state, { taskTitle, subtaskTitle, isCompleted }) => {
      const updatedBoards = state.boards.map((board) => {
        const updatedColumns = board.columns.map((column) => {
          const updatedTasks = column.tasks.map((task) => {
            if (task.title === taskTitle) {
              const updatedSubtasks = task.subtasks.map((subtask) => {
                if (subtask.title === subtaskTitle) {
                  return { ...subtask, isCompleted };
                }
                return subtask;
              });
              return { ...task, subtasks: updatedSubtasks };
            }
            return task;
          });
          return { ...column, tasks: updatedTasks };
        });
        return { ...board, columns: updatedColumns };
      });

      return { ...state, boards: updatedBoards };
    }
  ),

  on(TaskActions.deleteTask, (state, { taskTitle }) =>
    adapter.removeOne(taskTitle, state)
  ),

  on(TaskActions.updateTask, (state, { task }) => {
    const updatedBoards = state.boards.map((board) => {
      const updatedColumns = board.columns.map((column) => {
        const updatedTasks = column.tasks.map((existingTask) => {
          if (existingTask.title === task.title) {
            // Update the task with the new status
            return { ...existingTask, status: task.status };
          }
          return existingTask;
        });
        return { ...column, tasks: updatedTasks };
      });
      return { ...board, columns: updatedColumns };
    });

    return { ...state, boards: updatedBoards };
  }),

  on(TaskActions.addBoard, (state, { board }) => ({
    ...state,
    boards: [...state.boards, board],
  })),
  on(TaskActions.clearSelectedTask, (state) => ({
    ...state,
    selectedTask: null,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
