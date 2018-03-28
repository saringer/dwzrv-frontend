import { Pipe, PipeTransform } from '@angular/core';
import {Dogpass} from "../../../../data-models/dogpass";
import {Judge} from "../../../../data-models/judge";

@Pipe({
  name: 'customdogfilter',
  pure: false
})

export class CustomDogFilter implements PipeTransform {
  transform(items: any[], filter: Dogpass): any {
    if (!items || !filter) {
      return items;
    }

    //return items.filter(item => item.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1);
    return items.filter(item =>this.function(item, filter));

  }
  function(dog: Dogpass, filter) {
    if(dog.breeder != null) {
      const searchStr = (dog.name + dog.breeder.kennelname).toLowerCase();
      return searchStr.indexOf(filter.name.toLowerCase()) !== -1;
    }
    else {
      const searchStr = (dog.name).toLowerCase();
      return searchStr.indexOf(filter.name.toLowerCase()) !== -1;
    }

  }

}
