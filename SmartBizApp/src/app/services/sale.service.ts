import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

 private sales: any[] = [];
  private totalSalesAmount: number = 0;

  constructor() {}

  addSale(sale: any) {
    this.sales.push(sale);
    this.totalSalesAmount += sale.totalAmount;
  }

  getSales() {
    return this.sales;
  }

 getTotalSalesAmount() {
    return this.sales.reduce((total, sale) => total + sale.totalPrice, 0);
  }
}
