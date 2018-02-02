import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Dogpass } from "../../data-models/dogpass";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Breeder} from "../../data-models/breeder";
import {Club} from "../../data-models/club";

@Injectable()
export class DogService {
  private dogsUrl = 'http://localhost:8080/get/dogs';
  private tournamentsUrl = 'http://localhost:8080/get/tournaments';
  private breedersUrl = 'http://localhost:8080/get/breeders';
  private ownersUrl = 'http://localhost:8080/get/owners';
  private clubsUrl = 'http://localhost:8080/get/clubs';


  dataChange: BehaviorSubject<Dogpass[]> = new BehaviorSubject<Dogpass[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private http: HttpClient) {
  }

  get data(): Dogpass[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  resetDialogData() {
    this.dialogData = null;
  }

  getAllDogs(): void {
    this.http.get<Dogpass[]>(this.dogsUrl).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }

  /**
   * Get Methods
   *
   */

  getDogs(): Observable<Dogpass[]> {
    return this.http.get<Dogpass[]>(this.dogsUrl);
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

  /**
   * Add Methods
   */

  addDog (dog: Dogpass): void {
    this.dialogData = dog;
  }

}

export interface Tournament {
    id: number;
    title: string;
    date: Date;
}

/*export interface Dog {
  name: string;
  owner: Owner;
  breeder: Breeder;

}*/

export interface Owner {
  firstname: string;
  lastname: string;
}
