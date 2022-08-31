import {ShiftInterface} from '../../models/shift/shift.interface';

export class ShiftsJson {
  public static shifts: ShiftInterface[] = [
    {
      id: 1,
      name: 'Day Shift',
      startTime: '07:00',
      endTime: '14:00',
    },
    {
      id: 2,
      name: 'Mid Shift',
      startTime: '12:00',
      endTime: '20:00',
    },
    {
      id: 3,
      name: 'Night Shift',
      startTime: '22:00',
      endTime: '06:00',
    }
  ]
}
