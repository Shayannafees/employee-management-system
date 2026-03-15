import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import {LoginComponent} from './login/login.component';
import { authGuard } from './auth.guard';




export const routes: Routes = [
  {path: 'employees', component: EmployeeComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];
