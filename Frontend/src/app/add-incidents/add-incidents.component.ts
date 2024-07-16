import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { AddIncident, Incident } from '../Models/incidents';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncidentsService } from '../services/incidents.service';

@Component({
  selector: 'app-add-incidents',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-incidents.component.html',
  styleUrl: './add-incidents.component.css',
})
export class AddIncidentsComponent implements OnInit {
  role: string = '';
  incidents: Incident[] = [];
  form!: FormGroup;
  menuVisible: boolean = false;
  constructor(
    private route: Router,
    private auth: AuthenticationService,
    private incidentService: IncidentsService
  ) {}
  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    if (currentUser) {
      this.role = currentUser.ROLE;
    } else {
      this.route.navigate(['/login']); // Redirect to login if no user is found
    }
    this.form = new FormGroup({
      location: new FormControl(null, Validators.required),
      body: new FormControl(null, Validators.required),
      media: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    });
  }
  logout() {
    this.auth.logout();
    this.route.navigate(['/login']);
  }
  onSubmit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    const userId = currentUser.ID;
    if (this.form.valid) {
      const data: AddIncident = {
        ...this.form.value,
        userID: userId,
      };
      this.incidentService.addIncident(data);
      this.route.navigate(['/incidents']);
    }
  }
  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
    const menuElement = document.querySelector('.menu');
    if (menuElement) {
      menuElement.classList.toggle('show', this.menuVisible);
    }
  }
}
