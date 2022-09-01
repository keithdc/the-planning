import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, take, takeUntil} from 'rxjs';
import {EmployeeService} from '../../api/employee/employee.service';
import {EmployeeInterface} from '../../models/employee/employee.interface';
import {CalendarEnum} from '../../utils/enums/calendar.enum';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SharedUtils} from '../../utils/shared.utils';
import {MatDialog} from '@angular/material/dialog';
import {PlanningInterface} from '../../models/planning/planning.interface';
import {PlanningDialogComponent} from './components/planning-dialog/planning-dialog.component';
import {ScheduleServiceService} from '../../api/schedule/schedule.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit, OnDestroy {
  employees: EmployeeInterface[] | undefined;
  CalendarEnum: typeof CalendarEnum = CalendarEnum;
  formGroup: FormGroup;
  cols: number = 8;
  dates: Date[] = [];
  today: Date = new Date();
  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, public dialog: MatDialog, private sheduleServiceService: ScheduleServiceService) {
    this.formGroup = this.formBuilder.group({
      calendarView: null,
      date: null,
    });
    this.employeeService.getAll().pipe(takeUntil(this.unsubscribeAll)).subscribe(employees => {
      this.employees = employees;
    });
    this.formGroup.valueChanges.pipe(takeUntil(this.unsubscribeAll)).subscribe(form => {
      if (form.calendarView === CalendarEnum.DAY) {
        this.cols = 2;
      } else if (form.calendarView === CalendarEnum.WEEK) {
        this.cols = 8;
      }
      this.buildCalendar()
    })
  }

  ngOnInit(): void {
    this.buildCalendar()
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete()
  }


  buildCalendar(): void {
    this.dates = [];
    for (let i = 0; i < this.cols - 1; i++) {
      this.dates.push(new Date(SharedUtils.getStartWeek(i, 0)));
    }
  }


  openDialog(schedule?: PlanningInterface): void {
    const dialogRef = this.dialog.open(PlanningDialogComponent, {
      width: '250px',
      data: schedule,
    });

    dialogRef.afterClosed().subscribe((result: PlanningInterface) => {
      this.sheduleServiceService.create(result).pipe(take(1)).subscribe(schedules => {
        console.log(schedules)
      });
    });
  }
}
