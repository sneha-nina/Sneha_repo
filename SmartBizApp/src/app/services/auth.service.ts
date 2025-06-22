import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Sample User List
  private users = [
    { username: 'sneha', password: 'admin123', role: 'Admin' },
    { username: 'ravi', password: 'ravi123', role: 'Employee' },
    { username: 'sita', password: 'sita123', role: 'Employee' }
  ];

  private currentUser: any = null;

  constructor() {}

  // Validate login credentials and store to localStorage
  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      this.currentUser = user;
      localStorage.setItem('loggedInUser', JSON.stringify(user)); // <-- fixed here
      return true;
    }
    return false;
  }

  // Get current user details
  getCurrentUser() {
    if (!this.currentUser) {
      const userFromStorage = localStorage.getItem('loggedInUser'); // <-- fixed here
      if (userFromStorage) {
        this.currentUser = JSON.parse(userFromStorage);
      }
    }
    return this.currentUser;
  }

  // Logout user
  logout() {
    this.currentUser = null;
    localStorage.removeItem('loggedInUser'); // <-- fixed here
  }

  // Return dashboard route based on role
  getDashboardRoute(): string {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null'); // <-- fixed here
    if (user) {
      return user.role === 'Admin' ? '/admin-dashboard' : '/employee-dashboard';
    }
    return '/login';
  }
}