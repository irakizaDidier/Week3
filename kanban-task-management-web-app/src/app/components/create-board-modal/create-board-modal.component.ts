import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { createBoard } from '../../store/actions/task.actions';
import { Board } from '../../models/task';
import { TaskState } from '../../store/reducers/task.reducers';

@Component({
  selector: 'app-create-board-modal',
  templateUrl: './create-board-modal.component.html',
  styleUrls: ['./create-board-modal.component.css'],
})
export class CreateBoardModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Input() boards: Board[] = [];

  boardName: string = '';
  columns: { id: number; name: string }[] = [
    { id: 1, name: 'Todo' },
    { id: 2, name: 'Doing' },
  ];
  private columnIdCounter: number = 3;

  constructor(private store: Store<TaskState>) {}

  closeCreateBoardModal() {
    this.closeModal.emit();
  }

  addColumn() {
    this.columns.push({ id: this.columnIdCounter++, name: '' });
  }

  removeColumn(index: number) {
    this.columns.splice(index, 1);
  }

  createBoard() {
    if (this.boardName.trim()) {
      const validColumns = this.columns.filter(
        (column) => column.name.trim() !== ''
      );

      if (validColumns.length === 0) {
        alert('Please add at least one valid column name.');
        return;
      }

      const newBoard: Board = {
        name: this.boardName,
        columns: validColumns.map((column) => ({
          name: column.name,
          tasks: [],
        })),
      };

      console.log('Board data being sent:', newBoard);
      this.store.dispatch(createBoard({ board: newBoard }));
      this.boardName = '';
      this.columns = [
        { id: 1, name: 'Todo' },
        { id: 2, name: 'Doing' },
      ];

      this.closeCreateBoardModal();
    } else {
      alert('Please provide a board name.');
    }
  }

  onOverlayClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-overlay')) {
      this.closeCreateBoardModal();
    }
  }

  trackByFn(index: number, column: { id: number; name: string }) {
    return column.id;
  }
}
