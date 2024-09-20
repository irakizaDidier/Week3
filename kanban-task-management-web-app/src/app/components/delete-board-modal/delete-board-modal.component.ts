import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-board-modal',
  templateUrl: './delete-board-modal.component.html',
  styleUrls: ['./delete-board-modal.component.css'],
})
export class DeleteBoardModalComponent {
  @Input() boardTitle: string = '';
  @Output() deleteBoard = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onDelete() {
    this.deleteBoard.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
