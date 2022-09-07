import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from '../../api/employee/employee.service';
import {Subject, take, takeUntil} from 'rxjs';
import {EmployeeInterface} from '../../models/employee/employee.interface';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeDialogComponent} from './components/employee-dialog/employee-dialog.component';
import {ScheduleService} from '../../api/schedule/schedule.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employees: EmployeeInterface[] | undefined;
  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(private employeeService: EmployeeService,
              private scheduleService: ScheduleService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.employeeService.getAll().pipe(takeUntil(this.unsubscribeAll)).subscribe(employees => {
      this.employees = employees;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete()
  }

  openDialog(employee: EmployeeInterface): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '250px',
      data: employee,
    });

    dialogRef.afterClosed().subscribe((result: EmployeeInterface) => {
      if (result.id) {
        this.employeeService.update(result).pipe(take(1)).subscribe(employees => {
          this.employees = employees;
        });
      } else {
        this.employeeService.create(result).pipe(take(1)).subscribe(employees => {
          this.employees = employees;
        });
        this.scheduleService.create({id: (this.employees?.length ?? 0) + 1, employee: result, schedules: [] })
      }
    });
  }
}
