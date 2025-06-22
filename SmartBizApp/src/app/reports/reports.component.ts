import { Component, OnInit } from '@angular/core';
import { SaleService } from '../services/sale.service';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  dailySalesAmount: number = 0;
  totalCustomers: number = 0;
  productPerformance: any[] = [];

  constructor(
    private saleService: SaleService,
    private customerService: CustomerService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadDailySales();
    this.loadCustomerSummary();
    this.loadProductPerformance();
  }

  loadDailySales(): void {
    const today = new Date();
    const sales = this.saleService.getSales();
    const todaySales = sales.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate.toDateString() === today.toDateString();
    });

    this.dailySalesAmount = todaySales.reduce((total, sale) => total + sale.totalPrice, 0);
  }

  loadCustomerSummary(): void {
    this.totalCustomers = this.customerService.getCustomers().length;
  }

  loadProductPerformance(): void {
    const products = this.productService.getProducts();
    const sales = this.saleService.getSales();

    this.productPerformance = products.map(product => {
      const soldQuantity = sales
        .filter(sale => sale.itemName === product.itemName)
        .reduce((total, sale) => total + sale.quantity, 0);

      return {
        itemName: product.itemName,
        sold: soldQuantity,
        remainingStock: product.stockQuantity
      };
    });
  }
}