import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  isNavbarExpanded = false;

  toggleMenu(): void {
    this.isNavbarExpanded = !this.isNavbarExpanded;
  }

  handleNavCLose(): void {
    this.isNavbarExpanded = false;
  }
}
