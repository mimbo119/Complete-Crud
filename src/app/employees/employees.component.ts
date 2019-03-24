import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }
  
  snavToggle(snav){
    snav.toggle();
  }

}
