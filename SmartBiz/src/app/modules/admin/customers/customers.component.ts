import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Customer } from 'src/app/shared/models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  customers: Customer[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCustomers().subscribe((data: Customer[]) => this.customers = data);
  }

}
