import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from 'src/app/shared/department.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource, MatSort,  MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['deptName', 'code', 'actions' ];
  @ViewChild(MatSort) sort2 : MatSort;

  constructor(
    private service : DepartmentService,
    private notificationService : NotificationService,
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



}
