import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ShiftInterface} from '../../models/shift/shift.interface';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private shiftList: BehaviorSubject<ShiftInterface[]> = new BehaviorSubject<ShiftInterface[]>([]);

  constructor() { }

  getAll(): Observable<ShiftInterface[]> {
    return this.shiftList;
  }

  create(shift: ShiftInterface): Observable<ShiftInterface[]> {
    shift.id = this.shiftList.getValue().length + 1;
    this.shiftList.next([...this.shiftList.getValue(), shift]);
    return this.shiftList;
  }

  update(shift: ShiftInterface): Observable<ShiftInterface[]> {
    const index = this.shiftList.getValue().findIndex(emp => emp.id === shift.id);
    const employees = this.shiftList.getValue();
    this.shiftList.next(employees.splice(index, 1, shift));
    return this.shiftList;
  }
}
