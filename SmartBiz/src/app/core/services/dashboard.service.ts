import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { DashboardStats } from 'src/app/shared/models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  getDashboardStats() {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:3000';  // base URL

  constructor(private http: HttpClient) {}

  /** Admin-specific stats via one endpoint */
  getAdminDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/admin/dashboard-stats`);
  }

  /** Employee-specific stats via one endpoint */
 getEmployeeDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/employee/dashboard-stats`);
  }
  /** Or fetch all customers individually */
  getTotalCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customers`);
  }

  /** Fetch all products */
  getTotalProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  /** Fetch all transactions */
  getTotalTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions`);
  }

  /** Fetch outstanding transactions */
  getOutstandingPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions?outstanding=true`);
  }

  /** ForkJoin combined dashboard stats (if you prefer aggregating locally) */
  getCombinedDashboardStats() {
    return forkJoin({
      customers: this.getTotalCustomers(),
      products: this.getTotalProducts(),
      transactions: this.getTotalTransactions(),
      outstanding: this.getOutstandingPayments()
    });
  }
}
