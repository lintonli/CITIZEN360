
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { PollsService } from '../services/polls.service';
import { Poll } from '../Models/polls';

@Component({
  selector: 'app-polls',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './polls.component.html',
  styleUrl: './polls.component.css',
})
export class PollsComponent implements OnInit {
  role: string = '';
  errorMessage: { [key: string]: string } = {};
  successMessage: { [key: string]: string } = {};
  selectedOption: { [key: string]: string } = {};
  newOption: { [key: string]: string } = {};
  menuVisible: boolean = false;
  // @Input() pollData!: Poll;
  polls: Poll[] = [];
  constructor(
    private auth: AuthenticationService,
    private route: Router,
    private poll: PollsService
  ) {}
  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    if (currentUser) {
      this.role = currentUser.ROLE;
    } else {
      this.route.navigate(['/login']); // Redirect to login if no user is found
    }
    this.polls = this.poll.getPolls();
  }
  logout() {
    this.auth.logout();
    this.route.navigate(['/login']);
  }
  vote(poll: Poll) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    const userId = currentUser.ID;
    try {
      if (this.selectedOption[poll.ID]) {
        this.poll.vote(poll.title, this.selectedOption[poll.ID], userId);
        this.successMessage[poll.ID] = 'Voted successfully';
        this.errorMessage[poll.ID] = '';
      }
    } catch (error: any) {
      this.errorMessage[poll.ID] = error.message || error.toString();
      this.successMessage[poll.ID] = '';
    }
  }
  addOption(poll: Poll) {
    if (
      this.newOption[poll.ID] &&
      !poll.options.some((opt) => opt.name === this.newOption[poll.ID])
    ) {
      this.poll.addOption(poll.title, this.newOption[poll.ID]);
      this.newOption[poll.ID] = '';
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
