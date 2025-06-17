import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/products.model';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { Inject } from '@angular/core';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-make-sale',
  templateUrl: './make-sale.component.html',
  styleUrls: ['./make-sale.component.scss']
})
export class MakeSaleComponent implements OnInit {
  saleForm: FormGroup;
  products: Product[] = [];
  successMessage: string = '';
  errorMessage: string = '';

constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    // If TransactionService is provided via a string or InjectionToken, use:
    // @Inject('TransactionServiceToken') private transactionService: TransactionService,
    private productService: ProductService
  ) {
    this.saleForm = this.fb.group({
      customerName: ['', Validators.required],
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      paymentStatus: ['Paid', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: () => this.errorMessage = 'Failed to load products.'
    });
  }

  onSubmit(): void {
    if (this.saleForm.valid) {
      const newSale: Transaction = this.saleForm.value;
      this.transactionService.addTransaction(newSale).subscribe({
        next: () => {
          this.successMessage = 'Sale recorded successfully!';
          this.saleForm.reset();
        },
        error: () => this.errorMessage = 'Failed to record sale.'
      });
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
    }
  }
}
