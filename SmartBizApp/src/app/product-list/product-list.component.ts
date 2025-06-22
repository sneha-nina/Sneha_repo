import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
searchTerm: string = '';
filteredProducts: any[] = [];
  products: any[] = [];
  constructor(private productService: ProductService,private router: Router, private authService: AuthService,
    private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.products = this.productService.getProducts();


  }
  loadProducts() {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }
   goBack(): void {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (currentUser && currentUser.role === 'Admin') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/employee-dashboard']);
    }
  }
  canEditOrDelete(): boolean {
  const user = this.authService.getCurrentUser();
  return user && user.role === 'Admin';
}

editProduct(product: any): void {
  alert('Edit functionality coming soon for: ' + product.itemName);
}

deleteProduct(productId: number): void {
  this.productService.deleteProduct(productId);
  this.loadProducts();
  alert('Product deleted successfully!');
}
searchProducts(): void {
  const term = this.searchTerm.toLowerCase();
  this.filteredProducts = this.products.filter(p =>
    p.itemName.toLowerCase().includes(term)
  );
 }
}
