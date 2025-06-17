import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
   template: `
    <h2>Logging out...</h2>
  `
})
export class LogoutComponent {
constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.logout();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
