import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, take, takeUntil} from 'rxjs';
import {ShiftService} from '../../api/shift/shift.service';
import {ShiftInterface} from '../../models/shift/shift.interface';
import {MatDialog} from '@angular/material/dialog';
import {ShiftDialogComponent} from './components/shift-dialog/shift-dialog.component';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent implements OnInit, OnDestroy {
  shifts = new MatTableDataSource<ShiftInterface>();
  displayedColumns: string[] = ['edit', 'name', 'startTime', 'endTime'];
  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(private shiftService: ShiftService, public dialog: MatDialog) {
    this.shiftService.getAll().pipe(takeUntil(this.unsubscribeAll)).subscribe(shifts => {
      this.shifts.data = shifts;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete()
  }


  openDialog(employee?: ShiftInterface): void {
    const dialogRef = this.dialog.open(ShiftDialogComponent, {
      width: '250px',
      data: employee,
    });

    dialogRef.afterClosed().subscribe((result: ShiftInterface) => {
      if (result.id) {
        this.shiftService.update(result).pipe(take(1)).subscribe(shifts => {
          this.shifts.data = shifts;
        });
      } else {
        this.shiftService.create(result).pipe(take(1)).subscribe(shifts => {
          this.shifts.data = shifts;
        });
      }
    });
  }
}
