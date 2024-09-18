import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
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

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store
  ) {
    this.subscription = this.handleLoadTasks();
    this.subscription.add(this.handleAddTask());
    this.subscription.add(this.handleUpdateTask());
    this.subscription.add(this.handleDeleteTask());
    this.subscription.add(this.handleUpdateSubtaskStatus());
  }

  private handleLoadTasks(): Subscription {
    return this.actions$
      .pipe(
        ofType(TaskActions.loadTasks),
        mergeMap(() =>
          this.http.get<BoardsResponse>(this.dataUrl).pipe(
            map((data) => {
              console.log('Data loaded from JSON:', data);
              return TaskActions.loadTasksSuccess({ boards: data.boards });
            }),
            catchError((error) => {
              console.error('Error loading boards:', error.message);
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
          console.log('Updating task:', task);
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
          const taskId = action.taskId;
          console.log('Deleting task with ID:', taskId);
          return TaskActions.deleteTask({ taskId });
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
          const { taskId, subtaskId, isCompleted } = action;
          console.log(
            `Updating subtask ${subtaskId} of task ${taskId} with status ${isCompleted}`
          );
          return TaskActions.updateSubtaskStatus({
            taskId,
            subtaskId,
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
}
