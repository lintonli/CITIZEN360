import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { IUser } from '../Models/users';

@Component({
  selector: 'app-admin',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  role: string = '';
  users: IUser[] = [];
  menuVisible: boolean = false;
  constructor(private auth: AuthenticationService, private route: Router) {}
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
  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    if (currentUser) {
      this.role = currentUser.ROLE;
    } else {
      this.route.navigate(['/login']); // Redirect to login if no user is found
    }
    this.users = this.auth.getUsers();
  }
  delete(ID:string){
this.auth.deleteUser(ID)
console.log('User deleted')
  }
}
