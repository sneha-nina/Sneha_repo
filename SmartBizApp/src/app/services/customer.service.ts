import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

    private customers = [
    { id: 1, name: 'Rajesh Kumar', mobile: '9876543210', address: 'Bhubaneswar' },
    { id: 2, name: 'Sunita Sahu', mobile: '8887654321', address: 'Cuttack' },
    { id: 3, name: 'Akash Das', mobile: '9090909090', address: 'Puri' },
    { id: 4, name: 'Neha Mishra', mobile: '7878787878', address: 'Rourkela' },
    { id: 5, name: 'Manas Ranjan', mobile: '7676767676', address: 'Balasore' }
  ];

  constructor() {}

  getCustomers() {
    return this.customers;
  }
  addCustomer(newCustomer: any) {
  // Generate a new ID
  const newId = this.customers.length > 0
    ? Math.max(...this.customers.map(c => c.id)) + 1
    : 1;
  newCustomer.id = newId;

  this.customers.push(newCustomer);
}
deleteCustomer(id: number): void {
  this.customers = this.customers.filter(c => c.id !== id);
}

}
