import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  stats = {
    totalCustomers: 0,
    totalProducts: 0,
    totalSales: 0,
    totalOutstanding: 0
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.dashboardService.getDashboardStats().subscribe((data: any) => {
      this.stats.totalCustomers = data.customers.length;
      this.stats.totalProducts = data.products.length;
      this.stats.totalSales = data.transactions.length;
      this.stats.totalOutstanding = data.outstanding.length;
    });
  }
}
