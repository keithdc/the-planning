import {EmployeeInterface} from '../employee/employee.interface';
import {ShiftInterface} from '../shift/shift.interface';

export interface PlanningInterface {
  id: number,
  employee: EmployeeInterface;
  schedules?: ScheduleInterface[];
  schedule?: ScheduleInterface;
}

export interface ScheduleInterface {
  date: Date;
  shift: ShiftInterface;
}
