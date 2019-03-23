import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firebase : AngularFireDatabase, 
    private datePipe : DatePipe) { }

  employeeList : AngularFireList<any>;

  form : FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.email]),
    mobile : new FormControl('', [
      Validators.required, 
      Validators.minLength(8)
    ]),
    city : new FormControl(''),
    gender : new FormControl('1'),
    department : new FormControl(0),
    hireDate : new FormControl(''),
    isPermanent : new FormControl(false)
  });
  
  initializeForm(){
    this.form.setValue({
      $key : null,
      fullName : '',
      email : '',
      mobile : '',
      city : '',
      gender : '1',
      department : 0,
      hireDate : '',
      isPermanent : false
    });
  }

  getEmployees(){
    this.employeeList = this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }

  insertEmployee(employees){
    this.employeeList.push({
      fullName : employees.fullName,
      email : employees.email,
      mobile : employees.mobile,
      city : employees.city,
      gender : employees.gender,
      department : employees.department,
      hireDate: employees.hireDate == "" ? "" : this.datePipe.transform(employees.hireDate, 'yyyy-MM-dd'),
      isPermanent : employees.isPermanent

    })
  }
  updateEmployee(employees){
    this.employeeList.update(employees.$key,{
      fullName : employees.fullName,
      email : employees.email,
      mobile : employees.mobile,
      city : employees.city,
      gender : employees.gender,
      department : employees.department,
      hireDate: employees.hireDate == "" ? "" : this.datePipe.transform(employees.hireDate, 'yyyy-MM-dd'),
      isPermanent : employees.isPermanent
    });
  }

  deleteEmployee($key : string){
    this.employeeList.remove($key);
  }

  populate(employeeRow){
    this.form.setValue(_.omit(employeeRow, 'departmentName'));
  }
}
