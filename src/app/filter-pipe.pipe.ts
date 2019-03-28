import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(data: any, param1: string, param2: string, param3?: string): any {
    if (data) {
      return param3 ? data[param1][param2][param3] : data[param1][param2];
    }
  }

}
