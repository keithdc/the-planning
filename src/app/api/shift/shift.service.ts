import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ShiftInterface} from '../../models/shift/shift.interface';
import {AbstractApiService} from '../abstract/abstract-api.service';
import {EmployeeInterface} from '../../models/employee/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class ShiftService implements AbstractApiService<EmployeeInterface> {
  private shiftList: BehaviorSubject<ShiftInterface[]> = new BehaviorSubject<ShiftInterface[]>([]);

  constructor() { }

  create(shift: ShiftInterface): Observable<ShiftInterface[]> {
    shift.id = this.shiftList.getValue().length + 1;
    this.shiftList.next([...this.shiftList.getValue(), shift]);
    return this.shiftList;
  }

  get(id: number): Observable<ShiftInterface | undefined> {
    return of(this.shiftList.getValue().find(shift => shift.id === id));
  }

  getAll(): Observable<ShiftInterface[]> {
    return this.shiftList;
  }

  update(shift: ShiftInterface): Observable<ShiftInterface[]> {
    const index = this.shiftList.getValue().findIndex(emp => emp.id === shift.id);
    const shifts = this.shiftList.getValue();
    shifts.splice(index, 1, shift);
    return this.shiftList;
  }

  patch(shifts: ShiftInterface[]): Observable<ShiftInterface[]> {
    this.shiftList.next([...this.shiftList.getValue(), ...shifts]);
    return this.shiftList;
  }

}
