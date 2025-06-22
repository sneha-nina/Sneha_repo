import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.username && this.password) {
      const isLoggedIn = this.authService.login(this.username, this.password);
      if (isLoggedIn) {
        const user = this.authService.getCurrentUser(); // Now reliably gets from loggedInUser
        if (user.role === 'Admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (user.role === 'Employee') {
          this.router.navigate(['/employee-dashboard']);
        }
      } else {
        alert('Invalid credentials!');
      }
    } else {
      alert('Please enter username and password');
    }
  }
}