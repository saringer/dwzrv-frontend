import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Breeder} from "../../data-models/breeder";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Club} from "../../data-models/club";

@Injectable()
export class ClubService {

  private dogsUrl = 'http://localhost:8080/get/dogs';
  private tournamentsUrl = 'http://localhost:8080/get/tournaments';
  private breedersUrl = 'http://localhost:8080/get/breeders';
  private ownersUrl = 'http://localhost:8080/get/owners';
  private clubsUrl = 'http://localhost:8080/get/clubs';


  dataChange: BehaviorSubject<Club[]> = new BehaviorSubject<Club[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private http: HttpClient) {
  }

  get data(): Club[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  resetDialogData() {
    this.dialogData = null;
  }

  getAllClubs(): void {
    this.http.get<Club[]>(this.clubsUrl).subscribe(data => {
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



  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.clubsUrl);
  }


  /**
   * Add Methods
   */

  addClub (club: Club): void {
    this.dialogData = club;
  }

}
