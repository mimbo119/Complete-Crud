ng new project
ng g m employee --routing
project>> npm i --s @angular/material @angular/cdk @angular/animations
import css theme from @import '@angular/material/prebuilt-themes/deeppurple-amber.css'; in style.css
add icons in <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> in index.html
add modules with routing
add components.. parent/child
add service.. ng g s shared/employee
add material module.. ng g m material
import * as Material from '@angular/material'; in material module
import {MaterialModule} from './material/material.module'; in app module
add routing in app.routing.ts
add routing paths in individual modules
import { ReactiveFormsModule, FormsModule } from "@angular/forms"; in app module
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; in app module
import { FormGroup, FormControl, Validators } from "@angular/forms"; in employee.service.ts
import { EmployeeService } from './shared/employee.service'; in app module and inject in provider
import { EmployeeService } from '../../shared/employee.service'; in employee component and add in constructor

forms:
form : FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.email]),
    mobile : new FormControl('', [
      Validators.required, 
      Validators.minLength(8)
    ]),
});
for lazy{
reactiveforms in modules
material in modules}
<form [formGroup]="service.form" class="normal-form" (submit)="onSubmit()">
<mat-form-field>
<input 
formControlName="fullName" 
matInput 
placeholder="Full Name" 
required>
<mat-error>This field is mandatory</mat-error>

</mat-form-field>
*ngIf="service.form.controls['mobile'].errors?.required">This field is mandatory</mat-error>
material imports and exports:
CommonModule,
Material.MatToolbarModule,
Material.MatGridListModule,
Material.MatFormFieldModule,
Material.MatInputModule,
Material.MatRadioModule,
Material.MatSelectModule,
Material.MatCheckboxModule,
Material.MatDatepickerModule,
Material.MatNativeDateModule,
Material.MatButtonModule,
Material.MatSnackBarModule,
Material.MatTableModule,
Material.MatIconModule,
Material.MatProgressSpinnerModule,
Material.MatPaginatorModule,
Material.MatSortModule,
Material.MatDialogModule,
Material.MatSidenavModule,
Material.MatListModule,
Material.MatAutocompleteModule

this.EmployeeService
initializeForm(){
    this.form.setValue({
      $key : null,
      fullName : '',
    });
  }

npm i --s firebase angularfire2
npm i --s lodash
paste firebaseConfig : {} in environment.ts
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database"; in app module
imports : 
AngularFireModule.initializeApp(environment.firebaseConfig),
AngularFireDatabaseModule,
FormsModule

import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; in EmployeeService
employeeList : AngularFireList<any>; in EmployeeService

getEmployees(){
    this.employeeList = this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }

  insertEmployee(employees){
    this.employeeList.push({
      fullName : employees.fullName,
      hireDate: employees.hireDate == "" ? "" : this.datePipe.transform(employees.hireDate, 'yyyy-MM-dd'),
    })
  }

add departmnet in firebase node
get department values in array:
array = [];
  constructor(private firebase : AngularFireDatabase) {
    this.departmentList = this.firebase.list('department');
    this.departmentList.snapshotChanges().subscribe(
      list =>{this.array = list.map(item =>{return {
            $key : item.key,
            ...item.payload.val()
          };          
        });
      }
    );
   }

ng g s shared/notification

import { NotificationService } from '../../shared/notification.service'; in employee component.ts

ng g c employees/employee-list
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material'; in employeeList
listData : MatTableDataSource<any>;
in view
`<div class="mat-elevation-z8">
    <mat-table [dataSource]="listData" matSort>
      <ng-container matColumnDef="fullName">
          <mat-header-cell 
          *matHeaderCellDef 
          mat-sort-header> Full Name </mat-header-cell>
          <mat-cell *matCellDef="let element">{{element.fullName}}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef></mat-header-cell>
          <mat-cell *matCellDef="let row">
            <button mat-icon-button (click) = "onEdit(row)"><mat-icon>edit</mat-icon></button>
            <button mat-icon-button color="warn" (click) = "onDelete(row.$key)"><mat-icon>delete_outline</mat-icon>></button>
          </mat-cell>
      </ng-container>
      <ng-container matColumnDef="loading">
        <mat-footer-cell *matFooterCellDef colspan= "6" >
            <mat-spinner></mat-spinner>
        </mat-footer-cell>
      </ng-container>
      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      <mat-footer-row *matFooterRowDef="['loading']" [ngClass]="{'hide' : listData!=null}" ></mat-footer-row> "hide is a class"
    </mat-table>
    <mat-paginator [pageSizeOptions] = "[5, 10, 25, 50, 100]" [pageSize] = "5" showFirstLastButtons ></mat-paginator>
</div>`
add css for hide class
{
@ViewChild(MatSort) sort2 : MatSort;
  @ViewChild(MatPaginator) pages : MatPaginator;
  searchKey : string; in employeeList

  this.listData.sort = this.sort2;
        this.listData.paginator = this.pages; in ngOnInit
}
searh(=>)

<button mat-raised-button (click)="onCreateDept()">
    <mat-icon>add_circle</mat-icon>Departments
</button>
<mat-form-field class="searh-field" floatLabel = "never">
    <input matInput [(ngModel)]="searchKey" placeholder="Search" autocomplete="off" (keyup)= "applyFilter()">
    <button matButton matSuffix mat-icon-button aria-label="Clear" *ngIf="searchKey" (click)= "onSearchClear()" >
    <mat-icon>close</mat-icon>
    </button>
</mat-form-field>

onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }
applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase(); }  in employeeList.ts


for custom filter(){
    this.listData.filterPredicate = (data, filter) =>{
        return this.displayedColumns.some(ele =>{
          return ele !='actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        });
      }
}

MatDialog
add entryComponents : [EmployeeComponent, DepartmentsComponent] in app modules
onCreate(){
    this.deptService.initializeFormDept();
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true ;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "60%";
    dialogConfig.minWidth = "30%";
    dialogConfig.minHeight = "50%";
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

import { MatDialogRef } from '@angular/material'; in EmployeeComponent.ts
private dialogRef : MatDialogRef<EmployeeComponent> in constructor()
    add
onClose(){
    this.service.form.reset();
    this.service.initializeForm();
    this.dialogRef.close();
}

from list 
onEdit(row){
    this.service.populate(row);
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true ;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "70%";
    dialogConfig.height= "70%";
    dialogConfig.minWidth = "25%";
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

in service 
populate(employeeRow){
    this.form.setValue(_.omit(employeeRow, 'departmentName'));
}

add <span>{{ service.form.controls['$key'].value?"Edit Employee"  : "New Employee"}}</span> in view employee







