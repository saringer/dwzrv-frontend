import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Breeder} from "../../data-models/breeder";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Tournament} from "../../data-models/tournament";

@Injectable()
export class TournamentService {

  private dogsUrl = 'http://localhost:8080/get/dogs';
  private tournamentsUrl = 'http://localhost:8080/get/tournaments';
  private breedersUrl = 'http://localhost:8080/get/breeders';
  private ownersUrl = 'http://localhost:8080/get/owners';
  private clubsUrl = 'http://localhost:8080/get/clubs';


  dataChange: BehaviorSubject<Tournament[]> = new BehaviorSubject<Tournament[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private http: HttpClient) {
  }

  get data(): Tournament[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  resetDialogData() {
    this.dialogData = null;
  }

  getAllTournaments(): void {
    this.http.get<Tournament[]>(this.tournamentsUrl).subscribe(data => {
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



  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.tournamentsUrl);
  }


  /**
   * Add Methods
   */

  addTournament (tournament: Tournament): void {
    this.dialogData = tournament;
  }

}
