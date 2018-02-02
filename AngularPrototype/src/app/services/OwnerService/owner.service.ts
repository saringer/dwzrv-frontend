import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Breeder} from "../../data-models/breeder";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Dogowner} from "../../data-models/dogowner";

@Injectable()
export class OwnerService {

  private dogsUrl = 'http://localhost:8080/get/dogs';
  private tournamentsUrl = 'http://localhost:8080/get/tournaments';
  private breedersUrl = 'http://localhost:8080/get/breeders';
  private ownersUrl = 'http://localhost:8080/get/owners';
  private clubsUrl = 'http://localhost:8080/get/clubs';


  dataChange: BehaviorSubject<Dogowner[]> = new BehaviorSubject<Dogowner[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private http: HttpClient) {
  }

  get data(): Dogowner[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  resetDialogData() {
    this.dialogData = null;
  }

  getAllOwners(): void {
    this.http.get<Dogowner[]>(this.ownersUrl).subscribe(data => {
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



  getOwners(): Observable<Dogowner[]> {
    return this.http.get<Dogowner[]>(this.ownersUrl);
  }


  /**
   * Add Methods
   */

  addOwner (dogowner: Dogowner): void {
    this.dialogData = dogowner;
  }

}
