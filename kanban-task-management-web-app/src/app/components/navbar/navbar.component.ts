import { Component, HostListener, Renderer2, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDarkMode } from '../../store/selectors/theme.selectors';
import * as ThemeActions from '../../store/actions/theme.actions';
import { ChangeDetectorRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isSidebarActive = false;
  darkMode$: Observable<boolean>;
  isMobileView = false;

  @Input() selectedBoardTitle: string = 'Platform Launch'; 

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

    this.checkScreenWidth();
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  preventClose(event: Event) {
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const sidebar = document.querySelector('.sidebar');
    const navbarHeader = document.querySelector('.navbar-header');
    if (
      this.isSidebarActive &&
      sidebar &&
      navbarHeader &&
      !sidebar.contains(event.target as Node) &&
      !navbarHeader.contains(event.target as Node)
    ) {
      this.isSidebarActive = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isMobileView = window.innerWidth <= 768;
  }

  toggleTheme() {
    this.store.dispatch(ThemeActions.toggleTheme());
  }
}
