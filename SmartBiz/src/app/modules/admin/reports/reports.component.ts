import { Component } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  totalSales!: number;
  outstandingPayments!: number;
  totalCustomers!: number;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getAdminDashboardStats().subscribe(stats => {
      this.totalSales = stats['totalSales'];
      this.outstandingPayments = stats['totalOutstanding'];
      this.totalCustomers = stats['totalCustomers'];
    });
  }

}
