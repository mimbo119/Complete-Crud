import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departmentList : AngularFireList<any>;
  array = [];

  constructor(private firebase : AngularFireDatabase) {
    this.departmentList = this.firebase.list('department');
    this.departmentList.snapshotChanges().subscribe(
      list =>{
        this.array = list.map(item =>{
          return {
            $key : item.key,
            ...item.payload.val()
          };          
        });
      }
    );
   }


   formDept : FormGroup = new FormGroup({
    $key: new FormControl(null),
    deptName : new FormControl('', [Validators.required]),
    code : new FormControl('', [Validators.required]),
    
  });

  initializeFormDept(){
    this.formDept.setValue({
      $key : null,
      deptName : '',
      code : '',
    });
  }

  insertDept(department){
    this.departmentList.push({
      name : department.deptName,
      code : department.code,
    })
  }

  getDepartments(){
    this.departmentList = this.firebase.list('department');
    return this.departmentList.snapshotChanges();
  }

   getDept($key){
     if($key == "0" || $key == "" || !$key ){
       return "";
     }
     else{
       return _.find(this.array, (obj)=>{

         return obj.$key == $key;
        } 
        ) ['name'];
     }
   }

   deleteDept($key : string){
    this.departmentList.remove($key);

  }
}
