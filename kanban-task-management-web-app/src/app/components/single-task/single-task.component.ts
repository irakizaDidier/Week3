import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task';
import * as TaskActions from '../../store/actions/task.actions';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css'],
})
export class SingleTaskComponent implements OnInit {
  @Input() task?: Task;

  constructor(private store: Store) {}

  ngOnInit(): void {
    console.log('Received Task:', this.task);
  }

  toggleSubtask(subtask: any): void {
    if (this.task) {
      const updatedSubtaskStatus = !subtask.isCompleted;
      this.store.dispatch(
        TaskActions.updateSubtaskStatus({
          taskTitle: this.task.title,
          subtaskTitle: subtask.title,
          isCompleted: updatedSubtaskStatus,
        })
      );
    }
  }

  updateTaskStatus(): void {
    if (this.task) {
      this.store.dispatch(TaskActions.updateTask({ task: this.task }));
    }
  }

  getCompletedSubtaskCount(): number {
    return (
      this.task?.subtasks.filter((subtask) => subtask.isCompleted).length || 0
    );
  }

  closeModal(): void {
    this.task = undefined;
    console.log('Modal closed');
  }

  onContainerClick(event: MouseEvent): void {
    this.closeModal();
  }
}
