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

  isDropdownOpen = false;
  isEditBoardModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;

  @Input() selectedBoardTitle: string = 'Platform Launch';
  @Input() isSidebarHidden: boolean = false;

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

    const dropdown = document.querySelector('.dropdown-menu');
    const ellipsisButton = document.querySelector('.ellipsis-button');
    if (
      this.isDropdownOpen &&
      dropdown &&
      ellipsisButton &&
      !dropdown.contains(event.target as Node) &&
      !ellipsisButton.contains(event.target as Node)
    ) {
      this.isDropdownOpen = false;
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

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addTask(task: any) {
    console.log('New task created:', task);
    this.closeModal();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  openEditBoardModal() {
    this.isEditBoardModalOpen = true;
  }

  closeEditBoardModal() {
    this.isEditBoardModalOpen = false;
  }

  openDeleteBoardModal() {
    this.isDeleteModalOpen = true;
  }

  closeDeleteBoardModal() {
    this.isDeleteModalOpen = false;
  }

  deleteBoard() {
    console.log(`Deleting board: ${this.selectedBoardTitle}`);
    this.isDeleteModalOpen = false;
  }
}
