import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TaskActions from '../../store/actions/task.actions';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
})
export class TaskModalComponent {
  task: Task = {
    title: '',
    description: '',
    status: '',
    subtasks: [],
  };
  subtasks: { title: string }[] = [{ title: '' }];

  @Output() close = new EventEmitter<void>();

  constructor(private store: Store) {}

  closeModal() {
    this.close.emit();
  }

  createTask() {
    if (!this.task.title || !this.task.status) {
      alert('Please fill in the required fields.');
      return;
    }

    this.task.subtasks = this.subtasks.map((subtask) => ({
      title: subtask.title,
      isCompleted: false,
    }));

    this.store.dispatch(TaskActions.addTask({ task: this.task }));
    this.close.emit();
  }

  addSubtask() {
    this.subtasks.push({ title: '' });
  }

  removeSubtask(index: number) {
    this.subtasks.splice(index, 1);
  }

  handleFocus(index: number) {
    const inputElement = document.querySelector(`[name="subtask${index}"]`);
    if (inputElement) {
      (inputElement as HTMLElement).focus();
    }
  }
}
