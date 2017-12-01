import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Dogpass } from "../data-models/dogpass";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class DogService {
  private dogsUrl = 'http://localhost:8080/get/dogs';
  private tournamentsUrl = 'http://localhost:8080/get/tournaments';


  constructor(private http: HttpClient) {
  }



  getDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>(this.dogsUrl);
  }

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.tournamentsUrl);
  }

}

export interface Tournament {
    id: number;
    title: string;
    date: Date;
}

export interface Dog {
  name: string;
  owner: Owner;
}

export interface Owner {
  firstname: string;
  lastname: string;
}
