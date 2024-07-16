import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewsService } from '../services/views.service';
import { Views } from '../Models/views';
import { AddViewComponent } from '../add-view/add-view.component';

@Component({
  selector: 'app-views',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterModule,AddViewComponent],
  templateUrl: './views.component.html',
  styleUrl: './views.component.css',
})
export class ViewsComponent implements OnInit {
  role: string = '';
  menuVisible: boolean = false;
  views: Views[] = [];
  showModal: boolean = false;
  constructor(
    private auth: AuthenticationService,
    private route: Router,
    private viewService: ViewsService
  ) {}
  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    if (currentUser) {
      this.role = currentUser.ROLE;
    } else {
      this.route.navigate(['/login']); // Redirect to login if no user is found
    }
    this.views = this.viewService.getViews();
  }
  logout() {
    this.auth.logout();
    this.route.navigate(['/login']);
  }
  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
    const menuElement = document.querySelector('.menu');
    if (menuElement) {
      menuElement.classList.toggle('show', this.menuVisible);
    }
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
}
