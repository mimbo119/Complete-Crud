ng new project
project>> npm i --s @angular/material @angular/cdk @angular/animations
import css theme from @import '@angular/material/prebuilt-themes/deeppurple-amber.css'; in style.css
add icons in index.html
add components.. parent/child
add service.. ng g s shared/employee
add material module.. ng g m material
import * as Material from '@angular/material'; in material module
import {MaterialModule} from './material/material.module'; in app module
import { FormGroup, FormControl } from "@angular/forms"; in employee.service.ts
import { EmployeeService } from './shared/employee.service'; in app module and inject in provider
import { EmployeeService } from '../../shared/employee.service'; in employee component and add in constructor
import { ReactiveFormsModule } from "@angular/forms"; in app 
forms:
<form [formGroup] = "service.form" class="normal-form">
<input formController = "fullName" matInput placeholder="Full Name" ></input>
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
    Material.MatButtonModule






