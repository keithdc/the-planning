import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {EmployeeInterface} from '../../models/employee/employee.interface';
import {AbstractApiService} from '../abstract/abstract-api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements AbstractApiService<EmployeeInterface> {
  private employeeList: BehaviorSubject<EmployeeInterface[]> = new BehaviorSubject<EmployeeInterface[]>([]);

  constructor() { }

  create(employee: EmployeeInterface): Observable<EmployeeInterface[]> {
    employee.id = this.employeeList.getValue().length + 1;
    this.employeeList.next([...this.employeeList.getValue(), employee]);
    return this.employeeList;
  }

  get(id: number): Observable<EmployeeInterface | undefined> {
    return of(this.employeeList.getValue().find(employee => employee.id === id));
  }

  getAll(): Observable<EmployeeInterface[]> {
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
