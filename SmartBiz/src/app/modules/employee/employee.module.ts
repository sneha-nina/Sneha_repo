import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MakeSaleComponent } from './make-sale/make-sale.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    LogoutComponent,
    DashboardComponent,
    MakeSaleComponent,
    AddCustomerComponent,
    ViewProductsComponent,
    EmployeeDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
