import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as TaskActions from '../actions/task.actions';
import { BoardsResponse } from '../../models/task';

@Injectable()
export class TaskEffects {
  private readonly dataUrl = '/assets/data/data.json'; 

  constructor(private http: HttpClient) {}

  private actions$ = inject(Actions);


  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.http.get<BoardsResponse>(this.dataUrl).pipe(
          map((data) => TaskActions.loadTasksSuccess({ boards: data.boards })),
          catchError((error) =>
            of(TaskActions.loadTasksFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskActions.addTask),
        map((action) => {
          const { task } = action;
          console.log('Adding task:', task);
          return { type: '[Task/API] Add Task Success' };
        }),
        catchError((error) =>
          of(TaskActions.loadTasksFailure({ error: error.message }))
        )
      ),
    { dispatch: true }
  );

  updateTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskActions.updateTask),
        map((action) => {
          const { task } = action;
          console.log('Updating task:', task);
          return { type: '[Task/API] Update Task Success' };
        }),
        catchError((error) =>
          of(TaskActions.loadTasksFailure({ error: error.message }))
        )
      ),
    { dispatch: true }
  );

  deleteTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskActions.deleteTask),
        map((action) => {
          const { taskTitle } = action;
          console.log('Deleting task with title:', taskTitle);
          return { type: '[Task/API] Delete Task Success' };
        }),
        catchError((error) =>
          of(TaskActions.loadTasksFailure({ error: error.message }))
        )
      ),
    { dispatch: true }
  );

  updateSubtaskStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateSubtaskStatus),
      map((action) => {
        const { taskTitle, subtaskTitle, isCompleted } = action;
        console.log(
          `Updating subtask "${subtaskTitle}" for task "${taskTitle}" to completed: ${isCompleted}`
        );
        return { type: '[Subtask/API] Update Subtask Status Success' };
      }),
      catchError((error) =>
        of({
          type: '[Subtask/API] Update Subtask Status Failure',
          error: error.message,
        })
      )
    )
  );

  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createBoard),
      map((action) => {
        const { board } = action;
        console.log('Creating board:', board);
        return TaskActions.addBoard({ board });
      })
    )
  );
}
