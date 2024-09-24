import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as TaskActions from '../../store/actions/task.actions';
import { Task } from '../../models/task';
import { selectBoardByName } from '../../store/selectors/task.selectors';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
})
export class TaskModalComponent {
  @Input() currentBoardName: string = '';
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

  async createTask() {
    if (!this.task.title || !this.task.status) {
      alert('Please fill in the required fields.');
      return;
    }

    this.task.subtasks = this.subtasks.map((subtask) => ({
      title: subtask.title,
      isCompleted: false,
    }));

    try {
      const board = await firstValueFrom(
        this.store.pipe(select(selectBoardByName(this.currentBoardName)))
      );

      if (board) {
        this.store.dispatch(
          TaskActions.addTask({
            task: this.task,
            boardName: this.currentBoardName,
          })
        );
      }
    } catch (error) {}

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
