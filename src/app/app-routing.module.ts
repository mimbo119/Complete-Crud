import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { DepartmentListComponent } from './departments/department-list/department-list.component';

const routes: Routes = [
  {
    path: 'departments',
    component: DepartmentListComponent
    // loadChildren: './departments/departments.module#DepartmentsModule'
  },
  {
    path: 'employees',
    component: EmployeeListComponent
  },
  {
    path: '',
    component: EmployeeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
