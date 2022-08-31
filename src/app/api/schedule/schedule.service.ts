import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {PlanningInterface} from '../../models/planning/planning.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduleServiceService {
  private scheduleList: BehaviorSubject<PlanningInterface[]> = new BehaviorSubject<PlanningInterface[]>([]);

  constructor() { }

  getAll(): Observable<PlanningInterface[]> {
    return this.scheduleList;
  }

  create(schedule: PlanningInterface): Observable<PlanningInterface[]> {
    schedule.id = this.scheduleList.getValue().length + 1;
    this.scheduleList.next([...this.scheduleList.getValue(), schedule]);
    return this.scheduleList;
  }

  update(schedule: PlanningInterface): Observable<PlanningInterface[]> {
    const index = this.scheduleList.getValue().findIndex(emp => emp.id === schedule.id);
    const schedules = this.scheduleList.getValue();
    schedules.splice(index, 1, schedule);
    return this.scheduleList;
  }

  patch(schedules: PlanningInterface[]): Observable<PlanningInterface[]> {
    this.scheduleList.next([...this.scheduleList.getValue(), ...schedules]);
    return this.scheduleList;
  }
}
