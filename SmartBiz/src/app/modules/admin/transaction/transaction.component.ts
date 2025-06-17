import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Transaction } from 'src/app/shared/models/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  transactions: Transaction[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getTransactions().subscribe((data: Transaction[]) => this.transactions = data);
  }

}
