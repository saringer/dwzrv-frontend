import { Pipe, PipeTransform } from '@angular/core';
import {Dogpass} from "../../../data-models/dogpass";

@Pipe({
  name: 'customdogfilter',
  pure: false
})

export class CustomDogFilter implements PipeTransform {
  transform(items: any[], filter: Dogpass): any {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1);
  }
}
