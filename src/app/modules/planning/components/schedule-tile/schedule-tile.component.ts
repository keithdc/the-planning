import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EmployeeInterface} from '../../../../models/employee/employee.interface';
import {PlanningInterface, ScheduleInterface} from '../../../../models/planning/planning.interface';
import {DatePipe} from '@angular/common';
import {ColorEnum} from '../../../../utils/enums/color.enum';
import {ShiftInterface} from '../../../../models/shift/shift.interface';

@Component({
  selector: 'app-schedule-tile',
  templateUrl: './schedule-tile.component.html',
  styleUrls: ['./schedule-tile.component.scss']
})
export class ScheduleTileComponent implements OnInit, OnChanges {
  @Input() date: Date | undefined;
  @Input() employee: EmployeeInterface | undefined;
  @Input() schedules: PlanningInterface[] | undefined;
  @Input() shifts: ShiftInterface[] | undefined;
  shiftIndex: number = 0;
  schedule: ScheduleInterface | undefined;
  colors: string[] = Object.values(ColorEnum);

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const schedule = this.schedules?.find(schedule => schedule.employee.id == this.employee?.id);
    if (schedule && schedule.schedules) {
      this.schedule = schedule.schedules.find(schedule => this.datePipe.transform(schedule.date, 'shortDate') === this.datePipe.transform(this.date, 'shortDate'));
    }
    if (this.shifts) {
      this.shiftIndex = this.shifts.findIndex(shift => shift.id === this.schedule?.shift.id);
    }
  }

}
