import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { employeeGuard } from './core/guards/employee.guard';

//const routes: Routes = [{ path: 'core', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) }, { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) }, { path: 'admin', loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule) }, { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }];
const routes: Routes = [
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'employee',
    canActivate: [authGuard, employeeGuard],
    loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
