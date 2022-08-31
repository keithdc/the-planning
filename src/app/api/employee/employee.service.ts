import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {EmployeeInterface} from '../../models/employee/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeList: BehaviorSubject<EmployeeInterface[]> = new BehaviorSubject<EmployeeInterface[]>([]);

  constructor() { }

  getAll(): Observable<EmployeeInterface[]> {
    return this.employeeList;
  }

  create(employee: EmployeeInterface): Observable<EmployeeInterface[]> {
    employee.id = this.employeeList.getValue().length + 1;
    this.employeeList.next([...this.employeeList.getValue(), employee]);
    return this.employeeList;
  }

  update(employee: EmployeeInterface): Observable<EmployeeInterface[]> {
    const index = this.employeeList.getValue().findIndex(emp => emp.id === employee.id);
    const employees = this.employeeList.getValue();
    employees.splice(index, 1, employee);
    return this.employeeList;
  }

  patch(employees: EmployeeInterface[]): Observable<EmployeeInterface[]> {
    this.employeeList.next([...this.employeeList.getValue(), ...employees]);
    return this.employeeList;
  }
}
