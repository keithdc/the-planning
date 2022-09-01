import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {PlanningInterface} from '../../models/planning/planning.interface';
import {AbstractApiService} from '../abstract/abstract-api.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService implements AbstractApiService<PlanningInterface> {
  private scheduleList: BehaviorSubject<PlanningInterface[]> = new BehaviorSubject<PlanningInterface[]>([]);

  constructor() { }


  create(schedule: PlanningInterface): Observable<PlanningInterface[]> {
    schedule.id = this.scheduleList.getValue().length + 1;
    this.scheduleList.next([...this.scheduleList.getValue(), schedule]);
    return this.scheduleList;
  }

  get(id: number): Observable<PlanningInterface | undefined> {
    return of(this.scheduleList.getValue().find(schedule => schedule.id === id));
  }

  getAll(): Observable<PlanningInterface[]> {
    return this.scheduleList;
  }

  update(schedule: PlanningInterface): Observable<PlanningInterface[]> {
    const index = this.scheduleList.getValue().findIndex(emp => emp.employee.id === schedule.employee.id);
    const schedules = this.scheduleList.getValue();
    schedules.splice(index, 1, schedule);
    return this.scheduleList;
  }

  patch(schedules: PlanningInterface[]): Observable<PlanningInterface[]> {
    this.scheduleList.next([...this.scheduleList.getValue(), ...schedules]);
    return this.scheduleList;
  }
}
