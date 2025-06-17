import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ReportsComponent } from './reports/reports.component';
import { LogoutComponent } from './logout/logout.component';
import { OverviewCardComponent } from 'src/app/shared/components/overview-card/overview-card.component';
import { QuickLinkComponent } from 'src/app/shared/components/quick-link/quick-link.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    CustomersComponent,
    ProductsComponent,
    TransactionComponent,
    ReportsComponent,
    OverviewCardComponent,
    QuickLinkComponent,
    LogoutComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [
    DashboardComponent],
})
export class AdminModule { }
