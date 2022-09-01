import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PlanningInterface} from '../../../../models/planning/planning.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EmployeeService} from '../../../../api/employee/employee.service';
import {Subject, takeUntil} from 'rxjs';
import {EmployeeInterface} from '../../../../models/employee/employee.interface';
import {ShiftService} from '../../../../api/shift/shift.service';
import {ShiftInterface} from '../../../../models/shift/shift.interface';

@Component({
  selector: 'app-planning-dialog',
  templateUrl: './planning-dialog.component.html',
  styleUrls: ['./planning-dialog.component.scss']
})
export class PlanningDialogComponent implements OnInit, OnDestroy {
  employees: EmployeeInterface[] | undefined;
  shifts: ShiftInterface[] | undefined;
  formGroup: FormGroup;
  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(private employeeService: EmployeeService,
              private shiftService: ShiftService,
              public dialogRef: MatDialogRef<PlanningDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PlanningInterface,
              private formBuilder: FormBuilder) {
    this.employeeService.getAll().pipe(takeUntil(this.unsubscribeAll)).subscribe(employees => {
      this.employees = employees;
    });
    this.shiftService.getAll().pipe(takeUntil(this.unsubscribeAll)).subscribe(shifts => {
      this.shifts = shifts;
    });
    this.formGroup = this.formBuilder.group({
      id: null,
      employee: null,
      schedule: this.formBuilder.group({
        date: null,
        shift: null
      }),
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete()
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.formGroup.getRawValue())
  }
}
