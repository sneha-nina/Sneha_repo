import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';
import { SaleService } from '../services/sale.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

 adminName: string = '';
  totalCustomers: number = 0;
  totalProducts: number = 0;
  totalSalesAmount: number = 0;
  totalOutstanding: number = 0;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private productService: ProductService,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    this.adminName = currentUser ? currentUser.username : 'Admin';

    this.totalCustomers = this.customerService.getCustomers().length;
    this.totalProducts = this.productService.getProducts().length;
    this.totalSalesAmount = this.saleService.getTotalSalesAmount();
    this.totalOutstanding = 0; // static for now, you can update later
  }

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }
}
