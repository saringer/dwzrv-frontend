import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Breeder} from "../../data-models/breeder";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Club} from "../../data-models/club";

@Injectable()
export class ClubService {

  private saveClubUrl = 'http://localhost:8080/save/club';  // URL to web api
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

  getAllClubs(): void {
    this.http.get<Club[]>(this.clubsUrl).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }

  addClub (club: Club): void {
    const req = this.http.post(this.saveClubUrl, club);
    req.subscribe(club => this.dialogData = club);
  }

}
