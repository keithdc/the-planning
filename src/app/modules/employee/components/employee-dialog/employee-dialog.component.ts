import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EmployeeInterface} from '../../../../models/employee/employee.interface';
import {SharedUtils} from '../../../../utils/shared.utils';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent implements OnInit {
  employee: EmployeeInterface | undefined;
  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeInterface,
  ) {
    this.employee = SharedUtils.newObject<EmployeeInterface>(data);
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.employee)
  }
}
