import {PlanningInterface} from '../../models/planning/planning.interface';
import {SharedUtils} from '../shared.utils';

export class SchedulesJson {
  public static schedules: PlanningInterface[] = [
    {
      id: 1,
      employee: {
        id: 1,
        name: 'Keith'
      },
      schedules: [
        {
          date: new Date(SharedUtils.getStartWeek(0, 0)),
          shift: {
            id: 1,
            name: 'Day Shift',
            startTime: '07:00',
            endTime: '14:00',
          }
        },
        {
          date: new Date(SharedUtils.getStartWeek(1, 0)),
          shift: {
            id: 2,
            name: 'Mid Shift',
            startTime: '12:00',
            endTime: '20:00',
          },
        },
        {
          date: new Date(SharedUtils.getStartWeek(2, 0)),
          shift: {
            id: 3,
            name: 'Night Shift',
            startTime: '22:00',
            endTime: '06:00',
          },
        },
        {
          date: new Date(SharedUtils.getStartWeek(4, 0)),
          shift: {
            id: 3,
            name: 'Night Shift',
            startTime: '22:00',
            endTime: '06:00',
          },
        },
      ]
    },
    {
      id: 2,
      employee: {
        id: 2,
        name: 'Ken'
      },
      schedules: [
        {
          date: new Date(SharedUtils.getStartWeek(1, 0)),
          shift: {
            id: 2,
            name: 'Mid Shift',
            startTime: '12:00',
            endTime: '20:00',
          },
        },
        {
          date: new Date(SharedUtils.getStartWeek(2, 0)),
          shift: {
            id: 2,
            name: 'Mid Shift',
            startTime: '12:00',
            endTime: '20:00',
          },
        },
        {
          date: new Date(SharedUtils.getStartWeek(5, 0)),
          shift: {
            id: 2,
            name: 'Mid Shift',
            startTime: '12:00',
            endTime: '20:00',
          },
        },
      ]
    },
    {
      id: 3,
      employee: {
        id: 3,
        name: 'Karen'
      },
      schedules: []
    }
  ]
}
