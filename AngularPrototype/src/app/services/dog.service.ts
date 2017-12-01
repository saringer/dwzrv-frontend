import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Dogpass } from "../data-models/dogpass";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Breeder} from "../data-models/breeder";
import {Club} from "../data-models/club";

@Injectable()
export class DogService {
  private dogsUrl = 'http://localhost:8080/get/dogs';
  private tournamentsUrl = 'http://localhost:8080/get/tournaments';
  private breedersUrl = 'http://localhost:8080/get/breeders';
  private ownersUrl = 'http://localhost:8080/get/owners';
  private clubsUrl = 'http://localhost:8080/get/clubs';





  constructor(private http: HttpClient) {
  }



  getDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>(this.dogsUrl);
  }

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.tournamentsUrl);
  }

  getBreeders(): Observable<Breeder[]> {
    return this.http.get<Breeder[]>(this.breedersUrl);
  }
  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.ownersUrl);
  }
  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.clubsUrl);
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
  breeder: Breeder;

}

export interface Owner {
  firstname: string;
  lastname: string;
}
