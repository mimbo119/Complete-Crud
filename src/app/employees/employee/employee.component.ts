import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../shared/employee.service';
import { DepartmentService } from '../../shared/department.service';
import { NotificationService } from '../../shared/notification.service';
import { MatDialogRef } from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface User {
  name: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  breakpoint: number;


  constructor(private service : EmployeeService,
    private departmentService : DepartmentService,
    private notificationService : NotificationService,
    private dialogRef : MatDialogRef<EmployeeComponent>) { }

  // departments = [
  //   { id : 1 , value : 'Dep 1'},
  //   { id : 2 , value : 'Dep 2'},
  //   { id : 3 , value : 'Dep 3'}
  // ];

  test = [] = this.departmentService.array;
  department : User[] = this.test;
  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.service.getEmployees();
    this.breakpoint = (window.innerWidth <= 880) ? 1 : 2;
    this.filteredOptions = this.service.form.controls.department.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.department.slice())
      );
  }
  
  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.department.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 880) ? 1 : 2;
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeForm();
    this.notificationService.clear(' Form Cleared! ')
  }
  onSubmit(){
    if(this.service.form.valid){
      if (!this.service.form.get('$key').value){
        this.service.insertEmployee(this.service.form.value);
        this.service.form.reset();
        this.service.initializeForm();
        this.notificationService.success(' Submitted Successfully! ');
        this.onClose();
      }
      else{
      this.service.updateEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializeForm();
      this.notificationService.update(' Updated Successfully! ');
      this.onClose();
      }
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeForm();
    this.dialogRef.close();
  }
}
