import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { DepartmentService } from 'src/app/shared/department.service';
import { EmployeeComponent } from '../employee/employee.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { DepartmentsComponent } from '../departments/departments.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service : EmployeeService,
    private deptService : DepartmentService,
    private dialog : MatDialog,
    private notification : NotificationService  ) { }

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['fullName', 'email', 'mobile' , 'city' , 'departmentName', 'actions', ];
  @ViewChild(MatSort) sort2 : MatSort;
  @ViewChild(MatPaginator) pages : MatPaginator;
  searchKey : string;

  ngOnInit() {
    this.service.getEmployees().subscribe(
      list =>{
        let array = list.map(item => {
          let departmentName = this.deptService.getDept(item.payload.val()['department']);
          return {
            $key : item.key,
            departmentName,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort2;
        this.listData.paginator = this.pages;
      }
    );
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializeForm();
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true ;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "60%";
    dialogConfig.minWidth = "30%";
    dialogConfig.minHeight = "50%";
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onCreateDept(){
    this.service.initializeForm();
    const dialogConfig2 = new MatDialogConfig();
    // dialogConfig.disableClose = true ;
    dialogConfig2.autoFocus = true;
    dialogConfig2.width = "60%";
    dialogConfig2.height = "60%";
    // dialogConfig2.minWidth = "30%";
    // dialogConfig2.maxHeight = "70%";
    this.dialog.open(DepartmentsComponent, dialogConfig2);
  }

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

  onDelete($key){
    if(confirm('Are you sure?')){
    this.service.deleteEmployee($key);
    this.notification.clear(' Deleted Successfully! ');
    }
  }

}
