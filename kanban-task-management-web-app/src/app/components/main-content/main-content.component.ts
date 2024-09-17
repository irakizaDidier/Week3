import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TaskActions from '../../store/actions/task.actions';
import { Task } from '../../models/task';
import {
  selectAllTasks,
  selectTaskLoading,
  selectTaskError,
} from '../../store/selectors/task.selectors';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  tasks: Task[] = [];

  @Input() selectedBoard!: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
    this.tasks$ = this.store.select(selectAllTasks);
    this.loading$ = this.store.select(selectTaskLoading);
    this.error$ = this.store.select(selectTaskError);

    this.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter(
      (task) => task.status === status && task.board === this.selectedBoard
    );
  }

  getTaskCountByStatus(status: string): number {
    return this.getTasksByStatus(status).length;
  }

  getCompletedSubtaskCount(task: Task): number {
    return task.subtasks.filter((subtask) => subtask.isCompleted).length;
  }
}
