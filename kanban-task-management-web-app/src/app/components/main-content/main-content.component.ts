import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import * as TaskActions from '../../store/actions/task.actions';
import { Board, Task, Column } from '../../models/task';
import {
  selectAllBoards,
  selectTaskLoading,
  selectTaskError,
} from '../../store/selectors/task.selectors';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnChanges {
  @Input() selectedBoard!: string;
  boards$!: Observable<Board[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  tasks: Task[] = [];
  columns: Column[] = [];

  constructor(private store: Store) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedBoard']) {
      this.loadBoardData(this.selectedBoard);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());

    this.boards$ = this.store.select(selectAllBoards);
    this.loading$ = this.store.select(selectTaskLoading);
    this.error$ = this.store.select(selectTaskError);
    this.boards$.subscribe((boards) => {
      if (boards.length > 0) {
        this.loadBoardData(this.selectedBoard);
      }
    });
  }

  loadBoardData(boardName: string): void {
    if (!this.boards$) {
      return;
    }

    this.boards$.subscribe((boards) => {
      const selectedBoard = boards.find((board) => board.name === boardName);

      if (selectedBoard) {
        this.tasks = selectedBoard.columns.flatMap((column) => column.tasks);
        this.columns = selectedBoard.columns;
      }
    });
  }

  getColumns(): Column[] {
    return this.columns;
  }

  getTasksByStatus(status: string): Task[] {
    const filteredColumns = this.columns.filter(
      (column) => column.name === status
    );
    return filteredColumns.flatMap((column) => column.tasks);
  }

  getTaskCountByStatus(status: string): number {
    return this.getTasksByStatus(status).length;
  }

  getCompletedSubtaskCount(task: Task): number {
    return task.subtasks.filter((subtask) => subtask.isCompleted).length;
  }

  getColumnColorClass(columnName: string): string {
    switch (columnName.toLowerCase()) {
      case 'todo':
      case 'now':
        return 'todo';
      case 'doing':
      case 'next':
        return 'doing';
      case 'done':
      case 'later':
        return 'done';
      default:
        return '';
    }
  }

  addNewColumn(): void {}

  drop(event: CdkDragDrop<Task[]>, newStatus: string): void {
    if (event.previousContainer !== event.container) {
      const task = { ...event.previousContainer.data[event.previousIndex] };
      const updatedTask = { ...task, status: newStatus };
      console.log('Updated Task:', updatedTask);
      this.store.dispatch(TaskActions.updateTask({ task: updatedTask }));
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
