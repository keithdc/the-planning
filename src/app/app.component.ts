import {Component} from '@angular/core';
import {EmployeeService} from './api/employee/employee.service';
import {EmployeesJson} from './utils/json/employees-json';
import {take} from 'rxjs';
import {ShiftsJson} from './utils/json/shifts-json';
import {ShiftService} from './api/shift/shift.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private employeeService: EmployeeService, private shiftService: ShiftService) {
    this.employeeService.patch(EmployeesJson.employees).pipe(take(1)).subscribe();
    this.shiftService.patch(ShiftsJson.shifts).pipe(take(1)).subscribe();

  }
}
