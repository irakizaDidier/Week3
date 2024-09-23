import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TaskState } from '../reducers/task.reducers';
import { Board, Column, Task } from '../../models/task';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');


export const selectAllBoards = createSelector(
  selectTaskState,
  (state: TaskState) => state.boards
);


export const selectBoardByName = (boardName: string) =>
  createSelector(selectAllBoards, (boards: Board[]) => {
    return boards.find((board) => board.name === boardName);
  });


export const selectColumnByName = (boardName: string, columnName: string) =>
  createSelector(selectBoardByName(boardName), (board: Board | undefined) => {
    return board
      ? board.columns.find((column) => column.name === columnName)
      : undefined;
  });

export const selectTaskByTitle = (
  boardName: string,
  columnName: string,
  taskTitle: string
) =>
  createSelector(
    selectColumnByName(boardName, columnName),
    (column: Column | undefined) => {
      return column
        ? column.tasks.find((task) => task.title === taskTitle)
        : undefined;
    }
  );
