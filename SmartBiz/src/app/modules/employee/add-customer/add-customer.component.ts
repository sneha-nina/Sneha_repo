import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/shared/models/customer.model';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
  providers: [CustomerService]
})
export class AddCustomerComponent {
  customerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', [Validators.required]]
    });
  }

  // submit handler
  onSubmit(): void {
    if (this.customerForm.valid) {
      const newCustomer: Customer = this.customerForm.value;
      this.customerService.addCustomer(newCustomer).subscribe({
        next: (res) => {
          this.successMessage = 'Customer added successfully!';
          this.customerForm.reset();
        },
        error: (err) => {
          this.errorMessage = 'Failed to add customer.';
        }
      });
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
    }
  }
}
