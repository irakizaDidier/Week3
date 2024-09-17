import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'kanban-task-management-web-app';
  selectedBoard: string = 'Platform Launch';

  onBoardSelected(boardName: string): void {
    this.selectedBoard = boardName;
  }
}
