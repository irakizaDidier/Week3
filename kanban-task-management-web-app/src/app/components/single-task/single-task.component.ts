import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subtask, Task } from '../../models/task';
import * as TaskActions from '../../store/actions/task.actions';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css'],
})
export class SingleTaskComponent implements OnInit {
  @Input() task?: Task;
  status: string = '';

  constructor(private store: Store, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.task) {
      this.status = this.task.status;
    }
  }

  toggleSubtask(subtask: Subtask): void {
    if (this.task) {
      const updatedSubtaskStatus = !subtask.isCompleted;

      this.store.dispatch(
        TaskActions.updateSubtaskStatus({
          taskTitle: this.task.title,
          subtaskTitle: subtask.title,
          isCompleted: updatedSubtaskStatus,
        })
      );

      this.updateTaskStatus();
    }
  }

  onStatusChange(newStatus: string): void {
    if (this.task) {
      const updatedTask = {
        ...this.task,
        status: newStatus,
      };

      this.store.dispatch(TaskActions.updateTask({ task: updatedTask }));
    }
  }

  updateTaskStatus(): void {
    if (this.task) {
      const allSubtasks = this.task.subtasks.length;
      const completedSubtasks = this.getCompletedSubtaskCount();

      let newStatus: string;
      if (completedSubtasks === 0) {
        newStatus = 'Todo';
      } else if (completedSubtasks < allSubtasks) {
        newStatus = 'Doing';
      } else {
        newStatus = 'Done';
      }

      if (this.task.status !== newStatus) {
        const updatedTask = {
          ...this.task,
          status: newStatus,
        };

        this.store.dispatch(TaskActions.updateTask({ task: updatedTask }));
      }
    }
  }

  getCompletedSubtaskCount(): number {
    return (
      this.task?.subtasks.filter((subtask) => subtask.isCompleted).length || 0
    );
  }

  closeModal(): void {
    this.task = undefined;
    this.store.dispatch(TaskActions.clearSelectedTask());
    this.cdRef.detectChanges(); 
  }

  onContainerClick(event: MouseEvent): void {
    this.closeModal();
  }
}
