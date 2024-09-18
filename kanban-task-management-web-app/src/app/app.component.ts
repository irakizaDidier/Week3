import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'kanban-task-management-web-app';
  selectedBoard: string = 'Platform Launch';

  ngOnInit() {
    const storedBoard = localStorage.getItem('selectedBoard');
    if (storedBoard) {
      this.selectedBoard = storedBoard;
    }
  }

  onBoardSelected(boardName: string) {
    this.selectedBoard = boardName;
    localStorage.setItem('selectedBoard', boardName);
  }
}
