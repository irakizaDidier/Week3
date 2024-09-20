import {
  Component,
  EventEmitter,
  Output,
  Input,
  Renderer2,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDarkMode } from '../../store/selectors/theme.selectors';
import * as ThemeActions from '../../store/actions/theme.actions';
import { Board } from '../../models/task';
import * as TaskActions from '../../store/actions/task.actions';
import { selectAllBoards } from '../../store/selectors/task.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  darkMode$: Observable<boolean>;
  boards$: Observable<Board[]>;

  @Input() isSidebarHidden = false;

  @Output() boardSelected = new EventEmitter<string>();
  @Output() sidebarToggled = new EventEmitter<boolean>();

  selectedBoard: string = '';
  isCreateBoardModalOpen = false;

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {
    this.darkMode$ = this.store.select(selectDarkMode);
    this.boards$ = this.store.select(selectAllBoards);
  }

  ngOnInit() {
    this.darkMode$.subscribe((isDarkMode: boolean) => {
      if (isDarkMode) {
        this.renderer.addClass(document.body, 'dark-mode');
      } else {
        this.renderer.removeClass(document.body, 'dark-mode');
      }
      this.cdr.markForCheck();
    });
    this.boards$.subscribe((boards) => {
      if (boards.length > 0 && !this.selectedBoard) {
        this.selectBoard(boards[0].name);
      }
    });
  }

  toggleTheme() {
    this.store.dispatch(ThemeActions.toggleTheme());
  }

  selectBoard(boardName: string): void {
    this.selectedBoard = boardName;
    this.boardSelected.emit(boardName);
  }

  isBoardSelected(boardName: string): boolean {
    return this.selectedBoard === boardName;
  }

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
    this.sidebarToggled.emit(this.isSidebarHidden);
  }

  openCreateBoardModal() {
    this.isCreateBoardModalOpen = true;
  }

  closeCreateBoardModal() {
    this.isCreateBoardModalOpen = false;
  }

  createBoard(boardName: string) {
    if (boardName.trim()) {
      const newBoard: Board = {
        name: boardName,
        columns: [
          { name: 'Todo', tasks: [] },
          { name: 'Doing', tasks: [] },
        ],
      };

      this.store.dispatch(TaskActions.addBoard({ board: newBoard }));
      this.closeCreateBoardModal();
    } else {
      alert('Please provide a board name.');
    }
  }
}
