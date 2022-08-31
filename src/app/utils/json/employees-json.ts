import {EmployeeInterface} from '../../models/employee/employee.interface';

export class EmployeesJson {
  public static employees: EmployeeInterface[] = [
    {
      id: 1,
      name: 'Keith'
    },
    {
      id: 2,
      name: 'Ken'
    },
    {
      id: 3,
      name: 'Karen'
    }
  ]
}
