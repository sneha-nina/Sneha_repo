import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
   customers: any[] = [];
   searchTerm: string = '';
   filteredCustomers: any[] = [];

  constructor(private customerService: CustomerService,private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.customers = this.customerService.getCustomers();
  }
  loadCustomers(): void {
    this.customers = this.customerService.getCustomers();
    this.filteredCustomers = [...this.customers]; 
  }
goBack(): void {
  this.router.navigate([this.authService.getDashboardRoute()]);
}
canEditOrDelete(): boolean {
  const user = this.authService.getCurrentUser();
  return user && user.role === 'Admin';
}

editCustomer(customer: any): void {
  alert('Edit functionality coming soon for: ' + customer.name);
}

deleteCustomer(customerId: number): void {
  this.customerService.deleteCustomer(customerId);
  this.loadCustomers();
  alert('Customer deleted successfully!');
}
searchCustomers(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCustomers = this.customers.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.mobile.toLowerCase().includes(term) ||
      c.address.toLowerCase().includes(term)
    );
}

}