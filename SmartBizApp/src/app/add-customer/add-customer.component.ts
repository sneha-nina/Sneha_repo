import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
 newCustomer = {
    id: 0,
    name: '',
    mobile: '',
    address: ''
  };

  constructor(private customerService: CustomerService, private router: Router) {}

  // 
  addCustomerAndGoToList(): void {
  if (this.newCustomer.name && this.newCustomer.mobile && this.newCustomer.address) {
    this.customerService.addCustomer(this.newCustomer);
    alert('Customer added successfully!');

    const currentUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (currentUser && currentUser.role === 'Admin') {
      this.router.navigate(['/admin-dashboard/customers']);
    } else {
      this.router.navigate(['/employee-dashboard/customers']);
    }
  } else {
    alert('Please fill in all customer details.');
  }
}


 goBackWithoutAdding(): void {
  const currentUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  if (currentUser && currentUser.role === 'Admin') {
    this.router.navigate(['/admin-dashboard']);
  } else {
    this.router.navigate(['/employee-dashboard']);
  }
}

}