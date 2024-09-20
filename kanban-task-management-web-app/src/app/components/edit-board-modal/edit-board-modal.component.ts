import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-board-modal',
  templateUrl: './edit-board-modal.component.html',
  styleUrls: ['./edit-board-modal.component.css'],
})
export class EditBoardModalComponent {
  @Input() boardTitle: string = 'Platform Launch';
  @Output() close = new EventEmitter<void>(); 
  columns: string[] = ['Todo', 'Doing', 'Done'];

  updateColumn(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    this.columns[index] = inputElement.value;
  }

  removeColumn(index: number) {
    this.columns.splice(index, 1);
  }

  addColumn() {
    this.columns.push('');
  }

  saveChanges() {
    console.log('Board title:', this.boardTitle);
    console.log('Columns:', this.columns);
    this.closeModal();
  }

  closeModal() {
    this.close.emit(); 
  }

  preventClose(event: Event) {
    event.stopPropagation(); 
  }
}
