import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Dogpass } from "../data-models/dogpass";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class DogService {
  private serviceUrl = 'http://localhost:8080/get/dogs';

  dataChange: BehaviorSubject<Dog[]> = new BehaviorSubject<Dog[]>([]);
  get data(): Dog[] { return this.dataChange.value; }

  constructor(private http: HttpClient) {
  }



  getDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>(this.serviceUrl);
  }

}



export interface Dog {
  name: string;
  //ownerid: number;
}
