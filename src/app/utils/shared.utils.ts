import * as moment from 'moment';

export class SharedUtils {
  public static addDay(date: Date, day: number): Date {
    return moment(date)
      .add(day, 'd').toDate();
  }

  public static getStartDay(addDay: number, format?: string): Date | string {
    const date = moment()
      .add(addDay, 'd');
    if (format) {
      return date.format(format);
    } else {
      return date.toDate();
    }
  }

  public static getStartWeek(addDay: number, addWeek: number, format?: string): Date | string {
    const date = moment()
      .startOf('week')
      .add(1, 'd')
      .add(addWeek, 'week')
      .add(addDay, 'd');
    if (format) {
      return date.format(format);
    } else {
      return date.toDate();
    }
  }

  public static newObject<T>(obj: T, removeNull?: boolean): T | undefined {
    if (obj) {
      if (removeNull) {
        Object.keys(obj).forEach((key) => (obj[key as keyof T] === null) && delete obj[key as keyof T]);
      }
      return JSON?.parse(JSON?.stringify(obj));
    }
    return undefined;
  }
}
