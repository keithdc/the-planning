import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, take, takeUntil} from 'rxjs';
import {EmployeeService} from '../../api/employee/employee.service';
import {EmployeeInterface} from '../../models/employee/employee.interface';
import {CalendarEnum} from '../../utils/enums/calendar.enum';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SharedUtils} from '../../utils/shared.utils';
import {MatDialog} from '@angular/material/dialog';
import {PlanningInterface} from '../../models/planning/planning.interface';
import {PlanningDialogComponent} from './components/planning-dialog/planning-dialog.component';
import {ScheduleService} from '../../api/schedule/schedule.service';
import {ShiftInterface} from '../../models/shift/shift.interface';
import {ShiftService} from '../../api/shift/shift.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit, OnDestroy {
  employees: EmployeeInterface[] | undefined;
  schedules: PlanningInterface[] | undefined;
  shifts: ShiftInterface[] | undefined;
  CalendarEnum: typeof CalendarEnum = CalendarEnum;
  formGroup: FormGroup;
  cols: number = 8;
  dates: Date[] = [];
  today: Date = new Date();
  week: number = 0;
  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              public dialog: MatDialog,
              private scheduleService: ScheduleService,
              private shiftService: ShiftService,
              private datePipe: DatePipe) {
    this.formGroup = this.formBuilder.group({
      day: 0,
      week: 0,
      calendarView: null,
      date: null,
    });
    this.employeeService.getAll().pipe(takeUntil(this.unsubscribeAll)).subscribe(employees => {
      this.employees = employees;
    });
    this.scheduleService.getAll().pipe(takeUntil(this.unsubscribeAll)).subscribe(schedules => {
      this.schedules = schedules;
    });
    this.shiftService.getAll().pipe(takeUntil(this.unsubscribeAll)).subscribe(shifts => {
      this.shifts = shifts;
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
      if (this.formGroup.value.calendarView === CalendarEnum.DAY) {
        this.dates.push(new Date(SharedUtils.getStartDay(i + this.formGroup.value.day)));
      } else {
        this.dates.push(new Date(SharedUtils.getStartWeek(i + this.formGroup.value.day, this.formGroup.value.week)));
      }
    }
  }

  drop(event: CdkDragDrop<string[]>, employee: EmployeeInterface, date: Date) {
    const daysAdd = +event.container.id - +event.previousContainer.id;
    const newDate = SharedUtils.addDay(this.dates[+event.previousContainer.id], daysAdd)
    const schedule = this.schedules?.find(schedule => schedule.employee.id === employee.id);
    const getSchedule = schedule?.schedules?.find(schedule => this.datePipe.transform(schedule.date, 'shortDate') === this.datePipe.transform(this.dates[+event.previousContainer.id], 'shortDate'));
    const index = schedule?.schedules?.findIndex(schedule => this.datePipe.transform(schedule.date, 'shortDate') === this.datePipe.transform(this.dates[+event.previousContainer.id], 'shortDate'));
    if (newDate && getSchedule && schedule) {
      schedule?.schedules?.splice(index ?? 0, 1, {date: newDate, shift: getSchedule.shift});
      console.log(schedule)
      this.scheduleService.update(schedule).pipe(take(1)).subscribe(schedules => {
        this.schedules = [...schedules];
      });
    }
  }

  openDialog(schedule?: PlanningInterface): void {
    const dialogRef = this.dialog.open(PlanningDialogComponent, {
      width: '250px',
      data: schedule,
    });

    dialogRef.afterClosed().subscribe((result: PlanningInterface) => {
      const findExist = this.schedules?.find(schedule => schedule.employee.id === result.employee.id);
      if (findExist && findExist.schedules) {
        if (result.schedule) {
          findExist.schedules.push(result.schedule);
        }
        this.scheduleService.update(findExist).pipe(take(1)).subscribe(schedules => {
          this.schedules = [...schedules];
        });
      } else {
        this.scheduleService.create(result).pipe(take(1)).subscribe(schedules => {
          this.schedules = [...schedules];
        });
      }
    });
  }

  subtract(): void {
    if (this.formGroup.value.calendarView === CalendarEnum.DAY) {
      this.formGroup.patchValue({day: --this.formGroup.value.day});
    } else {
      this.formGroup.patchValue({week: --this.formGroup.value.week});
    }
  }

  add(): void {
    if (this.formGroup.value.calendarView === CalendarEnum.DAY) {
      this.formGroup.patchValue({day: ++this.formGroup.value.day});
    } else {
      this.formGroup.patchValue({week: ++this.formGroup.value.week});
    }
  }
}
