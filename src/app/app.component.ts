import { Component } from '@angular/core';
import {EmployeeService} from './api/employee/employee.service';
import {EmployeesJson} from './utils/employees-json';
import {take} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private employeeService: EmployeeService) {
    this.employeeService.patch(EmployeesJson.employees).pipe(take(1)).subscribe();
  }
}
