import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/shared/models/customer.model';
import { Product } from 'src/app/shared/models/products.model';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   private baseUrl = 'http://localhost:3000/users'; // example
  apiUrl: any;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
  getTransactions(): Observable<Transaction[]> {
  return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
}
getCustomers(): Observable<Customer[]> {
   return this.http.get<Customer[]>(`${this.apiUrl}/customers`);
}
 getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

}
// export class UserService {
//   private apiUrl = 'http://localhost:3000/api';  // or your actual API endpoint

//   constructor(private http: HttpClient) {}

//   // Customers
//   

//   addCustomer(customer: Customer): Observable<Customer> {
//     return this.http.post<Customer>(`${this.apiUrl}/customers`, customer);
//   }

//   // Products


//   addProduct(product: Product): Observable<Product> {
//     return this.http.post<Product>(`${this.apiUrl}/products`, product);
//   }

//   // Transactions
//   getTransactions(): Observable<Transaction[]> {
//     return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
//   }

//   addTransaction(transaction: Transaction): Observable<Transaction> {
//     return this.http.post<Transaction>(`${this.apiUrl}/transactions`, transaction);
//   }
// }