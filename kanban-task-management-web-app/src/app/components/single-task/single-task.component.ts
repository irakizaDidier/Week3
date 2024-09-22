import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css'],
})
export class SingleTaskComponent implements OnInit {
  @Input() task!: Task;

  ngOnInit(): void {
    console.log('Received Task:', this.task);
  }

  toggleSubtask(subtask: any): void {
    const isCompleted = !subtask.isCompleted;
    console.log(`Toggling subtask ${subtask.title} to ${isCompleted}`);
  }

  updateTaskStatus(): void {
    console.log('Updating task status to:', this.task.status);
  }

  getCompletedSubtaskCount(): number {
    return this.task.subtasks.filter((subtask) => subtask.isCompleted).length;
  }

  closeModal(): void {
    console.log('Modal closed');
  }
}
