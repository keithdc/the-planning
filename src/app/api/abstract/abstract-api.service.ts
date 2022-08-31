import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractApiService<T> {

  abstract getAll(): Observable<T[]>;
  abstract get(id: number): Observable<T | undefined>;
  abstract update(object: T): Observable<T[]>;
  abstract create(object: T): Observable<T[]>;
  abstract patch(object: T[]): Observable<T[]>;
}
