import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from 'src/app/shared/department.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource, MatSort,  MatDialog, MatDialogConfig } from '@angular/material';
import { DepartmentsComponent } from 'src/app/employees/departments/departments.component';
import { EmployeeListComponent } from 'src/app/employees/employee-list/employee-list.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  private dialog : MatDialog;
  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['deptName', 'code', 'actions' ];
  @ViewChild(MatSort) sort2 : MatSort;

  constructor(
    private service : DepartmentService,
    private notificationService : NotificationService,
    private employeeList : EmployeeListComponent
    // private dialogRef : MatDialogRef<DepartmentsComponent>

  ) { }

  ngOnInit() {
    this.service.getDepartments().subscribe(
      list =>{
        let array = list.map(item => {
          return {
            $key : item.key,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort2;
      }
    );
  }

  onSubmitDept(){
    if(this.service.formDept.valid){
        this.service.insertDept(this.service.formDept.value);
        this.service.formDept.reset();
        this.service.initializeFormDept();
        this.notificationService.success(' Submitted Successfully! ');
        this.onCloseDept();
      }
  }

  onCloseDept(){
    this.service.formDept.reset();
    this.service.initializeFormDept();
    // this.dialogRef.close();
  }

  onClear(){
    this.service.formDept.reset();
    this.service.initializeFormDept();
    this.notificationService.clear(' Form Cleared! ')
  }

  onDelete($key){
    if(confirm('Are you sure?')){
    this.service.deleteDept($key);
    this.notificationService.clear(' Deleted Successfully! ');
    }
  }
  onCreateDept(){
    this.service.initializeFormDept();
    const dialogConfig2 = new MatDialogConfig();
    // dialogConfig.disableClose = true ;
    dialogConfig2.autoFocus = true;
    dialogConfig2.width = "60%";
    dialogConfig2.height = "60%";
    // dialogConfig2.minWidth = "30%";
    // dialogConfig2.maxHeight = "70%";
    this.dialog.open(DepartmentsComponent, dialogConfig2);
  }
  onCreateDept2(){
    this.employeeList.onCreateDept();
  }



}
