import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CanActivateRoleGuard } from './guards/auth.guard';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ReportsComponent } from './reports/reports.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AddSaleComponent } from './add-sale/add-sale.component';
const routes: Routes = [{ path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'products', component: ProductListComponent },
{
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [CanActivateRoleGuard],
    data: { expectedRole: 'Admin' },
    children: [
    //{ path: '', component: AdminDashboardComponent },
    { path: 'transactions', component: TransactionsComponent },
    { path: 'reports', component: ReportsComponent },
    // { path: 'add-customer', component: AddCustomerComponent },
    // { path: 'add-product', component: AddProductComponent },
  ]
    
  },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
   { path: 'admin-dashboard/customers', component: CustomerListComponent },    // existing component
  { path: 'admin-dashboard/products', component: ProductListComponent },      // existing component
  {
  path: 'admin-dashboard/add-customer', component: AddCustomerComponent
},
{
  path: 'admin-dashboard/add-product', component: AddProductComponent
},
  {
  path: 'employee-dashboard/customers', component: CustomerListComponent
},
{
  path: 'employee-dashboard/products', component: ProductListComponent
},
{
  path: 'employee-dashboard/add-sale', component: AddSaleComponent
},
{
  path: 'admin-dashboard/add-sale', component: AddSaleComponent
},
  {
  path: 'employee-dashboard/add-customer', component: AddCustomerComponent
},

  {
    path: 'employee-dashboard',
    component: EmployeeDashboardComponent,
    canActivate: [CanActivateRoleGuard],
    data: { expectedRole: 'Employee' }
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
