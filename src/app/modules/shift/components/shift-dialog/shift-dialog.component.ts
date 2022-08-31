import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ShiftInterface} from '../../../../models/shift/shift.interface';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-shift-dialog',
  templateUrl: './shift-dialog.component.html',
  styleUrls: ['./shift-dialog.component.scss']
})
export class ShiftDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ShiftDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShiftInterface,
    private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      id: null,
      name: [null, [Validators.required]],
      startTime: null,
      endTime: null,
    });
    this.formGroup.patchValue(data);
  }

  ngOnInit(): void {
  }


  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.formGroup.getRawValue())
  }
}
