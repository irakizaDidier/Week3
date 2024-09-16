import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isSidebarActive = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
    const sidebar = document.querySelector('.sidebar');

    if (sidebar) {
      if (this.isSidebarActive) {
        sidebar.classList.add('active');
      } else {
        sidebar.classList.remove('active');
      }
    } else {
      console.error('Sidebar element not found');
    }
  }
}
