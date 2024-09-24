import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import * as TaskActions from '../../store/actions/task.actions';
import { Board, Task, Column } from '../../models/task';
import {
  selectAllBoards,
  selectTasksByBoard,
} from '../../store/selectors/task.selectors';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnChanges, OnDestroy {
  @Input() selectedBoard!: string;
  boards$!: Observable<Board[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  tasks: Task[] = [];
  columns: Column[] = [];
  selectedTask: Task | null = null;
  isEditBoardModalOpen: boolean = false;

  private boards: Board[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store, private cdRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedBoard'] && this.boards.length > 0) {
      this.loadBoardData(this.selectedBoard, this.boards);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());

    this.boards$ = this.store.select(selectAllBoards);
    this.boards$.pipe(takeUntil(this.unsubscribe$)).subscribe((boards) => {
      this.boards = boards;
      if (this.selectedBoard) {
        this.loadBoardData(this.selectedBoard, this.boards);
      }
      this.cdRef.markForCheck();
    });

    this.store
      .select(selectTasksByBoard(this.selectedBoard))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tasks) => {
        this.tasks = tasks;
        this.cdRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadBoardData(boardName: string, boards: Board[]): void {
    const selectedBoard = boards.find((board) => board.name === boardName);
    if (selectedBoard) {
      this.columns = selectedBoard.columns;
      this.cdRef.detectChanges();
    }
  }

  getColumns(): Column[] {
    return this.columns;
  }

  getTasksByStatus(status: string): Task[] {
    const filteredColumns = this.columns.filter(
      (column) => column.name === status
    );
    const tasks = filteredColumns.flatMap((column) => column.tasks);
    return tasks;
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

  drop(event: CdkDragDrop<Task[]>, newStatus: string): void {
    if (event.previousContainer !== event.container) {
      const task = { ...event.previousContainer.data[event.previousIndex] };
      const updatedTask = { ...task, status: newStatus };
      this.store.dispatch(TaskActions.updateTask({ task: updatedTask }));
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openTaskModal(task: Task): void {
    this.selectedTask = task;
    this.cdRef.detectChanges();
  }

  closeModal(): void {
    this.selectedTask = null;
    this.cdRef.detectChanges();
  }

  closeEditBoardModal() {
    this.isEditBoardModalOpen = false;
  }

  openEditBoardModal() {
    this.isEditBoardModalOpen = true;
  }
}
