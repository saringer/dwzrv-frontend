import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Club} from "../../data-models/club";
import {Breeder} from "../../data-models/breeder";
import {Dogpass} from "../../data-models/dogpass";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class BreederService {

  private dogsUrl = 'http://localhost:8080/get/dogs';
  private tournamentsUrl = 'http://localhost:8080/get/tournaments';
  private breedersUrl = 'http://localhost:8080/get/breeders';
  private ownersUrl = 'http://localhost:8080/get/owners';
  private clubsUrl = 'http://localhost:8080/get/clubs';


  dataChange: BehaviorSubject<Breeder[]> = new BehaviorSubject<Breeder[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private http: HttpClient) {
  }

  get data(): Breeder[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  resetDialogData() {
    this.dialogData = null;
  }

  getAllBreeder(): void {
    this.http.get<Breeder[]>(this.breedersUrl).subscribe(data => {
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



  getBreeders(): Observable<Breeder[]> {
    return this.http.get<Breeder[]>(this.breedersUrl);
  }


  /**
   * Add Methods
   */

  addBreeder (breeder: Breeder): void {
    this.dialogData = breeder;
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


