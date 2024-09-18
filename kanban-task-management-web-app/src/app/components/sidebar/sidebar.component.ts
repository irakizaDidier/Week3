import {
  Component,
  EventEmitter,
  Output,
  Renderer2,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDarkMode } from '../../store/selectors/theme.selectors';
import * as ThemeActions from '../../store/actions/theme.actions';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  darkMode$: Observable<boolean>;
  @Output() boardSelected = new EventEmitter<string>();

  boards: string[] = ['Platform Launch', 'Marketing Plan', 'Roadmap'];
  selectedBoard: string = 'Platform Launch';

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {
    this.darkMode$ = this.store.select(selectDarkMode);
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
    this.selectBoard(this.selectedBoard);
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
}
