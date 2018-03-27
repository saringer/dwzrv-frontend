import { Pipe, PipeTransform } from '@angular/core';

import {Judge} from "../../../../data-models/judge";

@Pipe({
  name: 'customjudgefilter',
  pure: false
})

export class CustomJudgeFilter implements PipeTransform {
  transform(items: any[], filter: Judge): any {
    if (!items || !filter) {
      return items;
    }

    //return items.filter(item => item.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1);
    return items.filter(item =>this.function(item, filter));
  }

  function(judge: Judge, filter) {
    const searchStr = (judge.firstname + judge.lastname).toLowerCase();
    return searchStr.indexOf(filter.firstname.toLowerCase()) !== -1;
  }


}
