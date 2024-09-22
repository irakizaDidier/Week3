import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as TaskActions from '../actions/task.actions';
import { BoardsResponse } from '../../models/task';

@Injectable()
export class TaskEffects {
  private readonly dataUrl = '/assets/data/data.json';
  private subscription: Subscription;

  constructor(private http: HttpClient, private store: Store) {
    this.subscription = this.handleLoadTasks();
    this.subscription.add(this.handleAddTask());
    this.subscription.add(this.handleUpdateTask());
    this.subscription.add(this.handleDeleteTask());
    this.subscription.add(this.handleUpdateSubtaskStatus());
  }

  private actions$ = inject(Actions);

  private handleLoadTasks(): Subscription {
    return this.actions$
      .pipe(
        ofType(TaskActions.loadTasks),
        mergeMap(() =>
          this.http.get<BoardsResponse>(this.dataUrl).pipe(
            map((data) => {
              return TaskActions.loadTasksSuccess({ boards: data.boards });
            }),
            catchError((error) => {
              return of(TaskActions.loadTasksFailure({ error: error.message }));
            })
          )
        )
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  private handleAddTask(): Subscription {
    return this.actions$
      .pipe(
        ofType(TaskActions.addTask),
        map((action) => {
          const task = action.task;
          console.log('Adding task:', task);
          return TaskActions.addTask({ task });
        }),
        catchError((error) =>
          of({ type: '[Task/API] Add Task Failure', error: error.message })
        )
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  private handleUpdateTask(): Subscription {
    return this.actions$
      .pipe(
        ofType(TaskActions.updateTask),
        map((action) => {
          const task = action.task;
          return TaskActions.updateTask({ task });
        }),
        catchError((error) =>
          of({ type: '[Task/API] Update Task Failure', error: error.message })
        )
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  private handleDeleteTask(): Subscription {
    return this.actions$
      .pipe(
        ofType(TaskActions.deleteTask),
        map((action) => {
          const taskTitle = action.taskTitle;
          return TaskActions.deleteTask({ taskTitle });
        }),
        catchError((error) =>
          of({ type: '[Task/API] Delete Task Failure', error: error.message })
        )
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  private handleUpdateSubtaskStatus(): Subscription {
    return this.actions$
      .pipe(
        ofType(TaskActions.updateSubtaskStatus),
        map((action) => {
          const { taskTitle, subtaskTitle, isCompleted } = action;
          return TaskActions.updateSubtaskStatus({
            taskTitle,
            subtaskTitle,
            isCompleted,
          });
        }),
        catchError((error) =>
          of({
            type: '[Subtask/API] Update Subtask Status Failure',
            error: error.message,
          })
        )
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createBoard),
      map((action) => {
        const board = action.board;
        return TaskActions.addBoard({ board });
      })
    )
  );
}
