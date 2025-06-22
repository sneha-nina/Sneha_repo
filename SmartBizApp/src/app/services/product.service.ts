import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // addProduct method is implemented below

 private products = [
    { id: 1, itemName: 'Rice Bag 25kg', price: 1200, stockQuantity: 10 },
    { id: 2, itemName: 'Cooking Oil 1L', price: 160, stockQuantity: 30 },
    { id: 3, itemName: 'Toothpaste', price: 55, stockQuantity: 50 },
    { id: 4, itemName: 'Washing Powder', price: 85, stockQuantity: 20 },
    { id: 5, itemName: 'Notebook (200pg)', price: 35, stockQuantity: 100 },
    { id: 6, itemName: 'Ball Pen', price: 10, stockQuantity: 500 },
    { id: 7, itemName: 'Detergent Bar', price: 20, stockQuantity: 40 },
    { id: 8, itemName: 'Milk Packet 500ml', price: 28, stockQuantity: 6 }
  ];

  constructor() {}

  getProducts() {
    return this.products;
  }
   addProduct(product: any) {
    this.products.push(product);
  }
deleteProduct(id: number): void {
  this.products = this.products.filter(p => p.id !== id);
}

}
