import { Injectable } from '@angular/core';
import { IUser } from '../Models/users';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private users: IUser[] = [
    {
      ID: '1',
      UNAME: 'ADMIN',
      UPASSWORD: 'ADMIN',
      EMAIL: 'lintonli162@gmail.com',
      ROLE: 'ADMIN',
      status: 'Approved',
    },
    {
      ID: '2',
      UNAME: 'CITIZEN',
      UPASSWORD: 'ADMIN',
      EMAIL: 'njaagagakure@gmail.com',
      ROLE: 'CITIZEN',
      status: 'Approved',
    },
    {
      ID: '3',
      UNAME: 'USER',
      UPASSWORD: 'ADMIN',
      EMAIL: 'brendakendi2001@gmail.com',
      ROLE: 'GOVERNMENT',
      status: 'Approved',
    },
  ];
  private isLoggedin: boolean = false;
  constructor() {}
  registerUser(newUser: IUser): void {
    this.users.push(newUser);
  }
  getUser(email: string) {
    return this.users.find((u) => u.EMAIL === email);
  }
  getUsers(): IUser[] {
    return this.users;
  }
  loginUser(EMAIL: string, UPASSWORD: string): boolean {
    const user = this.users.find(
      (x) => x.EMAIL === EMAIL && x.UPASSWORD === UPASSWORD
    );
    if (user) {
      this.isLoggedin = true;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }
  getCurrentUser(): IUser | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
  logout(): void {
    localStorage.removeItem('currentUser');
  }
  deleteUser(ID:string){
    const user= this.users.filter(x=>x.ID !==ID);
    return user;
  }
}
