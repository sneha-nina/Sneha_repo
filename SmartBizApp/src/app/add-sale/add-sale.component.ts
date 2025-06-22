import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { SaleService } from '../services/sale.service';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
// export class AddSaleComponent implements OnInit {

//   customers: any[] = [];
//   products: any[] = [];

//   selectedCustomer: string = '';
//   selectedProduct: string = '';
//   quantity: number = 1;
//   totalPrice: number = 0;

//   constructor(
//     private customerService: CustomerService,
//     private productService: ProductService,
//     private saleService: SaleService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.customers = this.customerService.getCustomers();
//     this.products = this.productService.getProducts();
//   }

//   updatePrice(): void {
//     const product = this.products.find(p => p.itemName === this.selectedProduct);
//     if (product) {
//       this.totalPrice = product.price * (this.quantity || 0);
//     } else {
//       this.totalPrice = 0;
//     }
//   }

//   addSale(): void {
//     if (this.selectedCustomer && this.selectedProduct && this.quantity > 0) {
//       const product = this.products.find(p => p.itemName === this.selectedProduct);

//       if (product && product.stockQuantity >= this.quantity) {
//         // Decrease stock quantity
//         product.stockQuantity -= this.quantity;

//         const newSale = {
//           id: this.saleService.getSales().length + 1,
//           customerName: this.selectedCustomer,
//           itemName: this.selectedProduct,
//           quantity: this.quantity,
//           totalPrice: this.totalPrice,
//           date: new Date()
//         };

//         this.saleService.addSale(newSale);

//         alert('Sale recorded successfully!');

//         // Redirect based on who is logged in
//         const loggedUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
//         if (loggedUser.role === 'Admin') {
//           this.router.navigate(['/admin-dashboard/transactions']);
//         } else {
//           this.router.navigate(['/employee-dashboard']);
//         }

//       } else {
//         alert('Not enough stock available!');
//       }

//     } else {
//       alert('Please fill all fields correctly.');
//     }
//   }

// }
export class AddSaleComponent implements OnInit {
  dashboardOrigin: string = '';

  customers: any[] = [];
  products: any[] = [];

  selectedCustomer: string = '';
  selectedProductId: number = 0;
  quantity: number = 1;

  currentBillItems: any[] = [];
  billTotal: number = 0;

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private saleService: SaleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customers = this.customerService.getCustomers();
    this.products = this.productService.getProducts();
     const currentUrl = this.router.url;
    if (currentUrl.includes('/admin-dashboard')) {
      this.dashboardOrigin = '/admin-dashboard';
    } else if (currentUrl.includes('/employee-dashboard')) {
      this.dashboardOrigin = '/employee-dashboard';
    }

  }

  addItemToBill(): void {
    const product = this.products.find(p => p.id === +this.selectedProductId);

    if (!this.selectedCustomer) {
      alert('Please select a customer first.');
      return;
    }

    if (product && this.quantity > 0) {
      if (product.stockQuantity >= this.quantity) {
        const itemTotal = product.price * this.quantity;

        this.currentBillItems.push({
          itemName: product.itemName,
          quantity: this.quantity,
          price: product.price,
          total: itemTotal
        });

        this.billTotal += itemTotal;

        // Decrease stock
        product.stockQuantity -= this.quantity;

        // Reset item selection
        this.selectedProductId = 0;
        this.quantity = 1;

      } else {
        alert(`Not enough stock for ${product.itemName}. Available: ${product.stockQuantity}`);
      }
    } else {
      alert('Please select product and valid quantity.');
    }
  }

  finishBilling(): void {
  this.currentBillItems.forEach(item => {
    const sale = {
      id: this.saleService.getSales().length + 1,
      customerName: this.selectedCustomer,
      itemName: item.itemName,
      quantity: item.quantity,
      totalPrice: item.total,
      date: new Date()
    };
    this.saleService.addSale(sale);
  });

  alert(`✅ Billing complete! Total amount: ₹${this.billTotal}`);

  // Route based on role
  const currentUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  if (currentUser && currentUser.role === 'Admin') {
    this.router.navigate(['/admin-dashboard']);
  } else {
    this.router.navigate(['/employee-dashboard']);
  }
    this.router.navigate([this.dashboardOrigin]);
}

  cancelBilling(): void {
    alert('Billing cancelled.');
   // this.router.navigate(['/employee-dashboard']);
   this.router.navigate([this.dashboardOrigin]);


  }
}
