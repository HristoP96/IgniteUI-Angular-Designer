import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(collection: {link: string, icon: string, name: string}[], value: string): {link: string, icon: string, name: string}[] {
    if (value) {
      return collection.filter(element => element.name.toLowerCase().includes(value.toLowerCase()));
    } else {
      return collection;
    }
  }

}
