import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/shared/models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

 private baseUrl = 'http://localhost:3000/transactions'; // or your actual API URL

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl, transaction);
  }
}
