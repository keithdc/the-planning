import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toTime'
})
export class ToTimePipe implements PipeTransform {

  transform(value: string): string {
    let time = value.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [value];
    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = (+time[0] % 12 || 12).toString(); // Adjust hours
    }
    return time.join('');
  }

}
