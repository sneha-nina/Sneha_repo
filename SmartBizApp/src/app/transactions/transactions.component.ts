import { Component, OnInit } from '@angular/core';
import { SaleService } from '../services/sale.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  sales: any[] = [];

  constructor(private saleService: SaleService) {}

  ngOnInit(): void {
    this.sales = this.saleService.getSales();
  }

}