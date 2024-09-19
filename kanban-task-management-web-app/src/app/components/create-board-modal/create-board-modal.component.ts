import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-board-modal',
  templateUrl: './create-board-modal.component.html',
  styleUrls: ['./create-board-modal.component.css'],
})
export class CreateBoardModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  boardName: string = '';
  columns: string[] = ['Todo', 'Doing'];

  closeCreateBoardModal() {
    this.closeModal.emit();
  }

  addColumn() {
    this.columns.push('');
  }

  removeColumn(index: number) {
    this.columns.splice(index, 1);
  }

  createBoard() {
    if (this.boardName.trim()) {
      console.log('Board Created:', this.boardName, this.columns);
      this.boardName = '';
      this.columns = ['Todo', 'Doing'];
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
}
