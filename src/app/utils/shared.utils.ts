import * as moment from 'moment';

export class SharedUtils {
  public static uniqueReducer<T>(array: T[], field?: string): T[] {
    // it seems we could replace this with this line, except for the field?: string part...
    // return array.filter((item, ind, self) => self.indexOf(item) === ind);
    // the below is the logic that was happening before
    return array.reduce((accumulator: T[], currentValue: T) => {
      const newRecords: T[] = [];
      if (Array.isArray(currentValue)) {
        currentValue.forEach(res => {
          if (!!res && !accumulator.includes(res) && !newRecords.includes(res)) {
            newRecords.push(res);
          }
        });
      } else if (currentValue) {
        if (field && currentValue[field as keyof T]) {
          const filter = accumulator.filter(res => res[field as keyof T] === currentValue[field as keyof T]);
          if (!(filter.length > 0)) {
            newRecords.push(currentValue);
          }
        } else {
          if (!accumulator.includes(currentValue) && !newRecords.includes(currentValue)) {
            newRecords.push(currentValue);
          }
        }
      }
      if (newRecords.length) {
        return [...accumulator, ...newRecords];
      } else {
        return [...accumulator];
      }
    }, []);
  }

  public static sortArray<T, K extends keyof T>(array: T[], field?: K, desc?: boolean): T[] {
    if (field) {
      if (desc) {
        return array.sort((n1, n2) => (n2[field] > n1[field] ? 1 : n2[field] < n1[field] ? -1 : 0));
      } else {
        return array.sort((n1, n2) => (n1[field] > n2[field] ? 1 : n1[field] < n2[field] ? -1 : 0));
      }
    }
    return array.sort((n1, n2) => (n1 > n2 ? 1 : n1 < n2 ? -1 : 0));
  }

  public static getKeyOnArray<T, R>(array: T[], key: string): R[] {
    return this.uniqueReducer(array.map(title => title[key as keyof T] as unknown) as R[]);
  }

  /**
   * moment start Date
   *
   * @param addMonth typeof number
   * @param format typeof string
   * @returns Date or formatted date
   */
  public static getStartDate(addMonth: number, format?: string): Date | string {
    const date = moment()
      .add(addMonth, 'M')
      .startOf('month');
    if (format) {
      return date.format(format);
    } else {
      return date.toDate();
    }
  }

  /**
   * moment end Date
   *
   * @param addMonth typeof number
   * @param format typeof string
   * @returns Date or formatted date
   */
  public static getEndDate(addMonth: number, format?: string): Date | string {
    const date = moment()
      .add(addMonth, 'M')
      .endOf('month');
    if (format) {
      return date.format(format);
    } else {
      return date.toDate();
    }
  }

  /**
   * moment start Day
   *
   * @param addDay typeof number
   * @param format typeof string
   * @returns Date or formatted date
   */
  public static getStartDay(addDay: number, format?: string): Date | string {
    const date = moment()
      .add(addDay, 'd')
      .startOf('day');
    if (format) {
      return date.format(format);
    } else {
      return date.toDate();
    }
  }

  /**
   * moment end Day
   *
   * @param addDay typeof number
   * @param format typeof string
   * @returns Date or formatted date
   */
  public static getEndDay(addDay: number, format?: string): Date | string {
    const date = moment()
      .add(addDay, 'd')
      .endOf('day');
    if (format) {
      return date.format(format);
    } else {
      return date.toDate();
    }
  }

  /**
   * check object if has null values or empty
   *
   * @param obj for object
   */
  public static checkPropertiesIfNull<T>(obj: T): boolean {
    return !Object.keys(obj).some(x => {
      const val = obj[x as keyof T];
      if (val === null || val === undefined) {
        return true;
      }
      if (typeof val === 'string') {
        return val === '';
      }
      return false;
    });
  }

  /**
   * return new object instance
   *
   * @param obj for object
   */
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
