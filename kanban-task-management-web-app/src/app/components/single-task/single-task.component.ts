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

  // Toggle the subtask completion status and dispatch the update action
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

  // Update the task's status when the select input changes
  updateTaskStatus(): void {
    if (this.task) {
      this.store.dispatch(TaskActions.updateTask({ task: this.task }));
    }
  }

  // Calculate the number of completed subtasks
  getCompletedSubtaskCount(): number {
    return (
      this.task?.subtasks.filter((subtask) => subtask.isCompleted).length || 0
    );
  }

  // Close the modal and clear the task
  closeModal(): void {
    this.task = undefined;
    console.log('Modal closed');
  }

  // Handle clicking outside the modal to close it
  onContainerClick(event: MouseEvent): void {
    this.closeModal();
  }
}
