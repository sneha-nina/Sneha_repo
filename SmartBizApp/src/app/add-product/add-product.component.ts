import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
   newProduct = {
    id: 0,
    itemName: '',
    price: 0,
    stockQuantity: 0
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  addProduct() {
     if (this.newProduct.itemName && this.newProduct.price > 0 && this.newProduct.stockQuantity >= 0) {
      this.newProduct.id = this.productService.getProducts().length + 1;
      this.productService.addProduct({ ...this.newProduct });
      alert('✅ Product added successfully!');

      // Reset the form fields
      this.newProduct = {
        id: 0,
        itemName: '',
        price: 0,
        stockQuantity: 0
      };
       // Optional: navigate to product list or stay here
     this.router.navigate(['/admin-dashboard/products']);

    } else {
      alert('⚠️ Please fill all fields correctly.');
    }
  }

}
