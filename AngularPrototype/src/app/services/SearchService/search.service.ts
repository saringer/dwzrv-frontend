import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class SearchService {

  private filterString = new BehaviorSubject<string>("");
  currentMessage = this.filterString.asObservable();

  constructor() { }

  changeFilterString(inputString: string) {
    this.filterString.next(inputString)
  }

}
