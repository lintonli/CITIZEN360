import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { Incident } from '../Models/incidents';
import { IncidentsService } from '../services/incidents.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  role: string = '';
  incidents: Incident[] = [];
  menuVisible: boolean = false;
  constructor(
    private auth: AuthenticationService,
    private route: Router,
    private incidentService: IncidentsService
  ) {}
  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    if (currentUser) {
      this.role = currentUser.ROLE;
    } else {
      this.route.navigate(['/login']); // Redirect to login if no user is found
    }
    this.incidents = this.incidentService.getIncidents();
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
}
