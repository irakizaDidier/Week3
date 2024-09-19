import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {
  task = {
    title: '',
    description: '',
    status: 'todo'
  };

  subtasks: string[] = [''];

  @Output() close = new EventEmitter<void>();
  @Output() addTask = new EventEmitter<any>();

  closeModal() {
    this.close.emit();
  }

  createTask() {
    this.addTask.emit({ ...this.task, subtasks: this.subtasks });
    this.closeModal();
  }

  addSubtask() {
    this.subtasks.push('');
  }

  removeSubtask(index: number) {
    this.subtasks.splice(index, 1);
  }
}
