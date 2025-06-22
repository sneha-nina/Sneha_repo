import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SaleService } from '../services/sale.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  username: string = '';
  totalSalesAmount: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private saleService: SaleService
  ) {
    // Prefer AuthService for current user
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.username = currentUser.username;
    } else {
      // Fallback to localStorage
      const storedUser = localStorage.getItem('loggedInUser');
      this.username = storedUser ? JSON.parse(storedUser).username : 'Employee';
    }
  }

  ngOnInit(): void {
    // Fetch total sales amount from SaleService
    this.totalSalesAmount = this.saleService.getTotalSalesAmount();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
