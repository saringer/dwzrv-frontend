import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Judge} from "../../data-models/judge";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AppSettings} from "../../appsettings";
import {Coursingresult} from "../../data-models/coursingresult";
import {Raceresult} from "../../data-models/raceresult";
import {Race} from "../../data-models/race";

@Injectable()
export class RaceRankingService {

  dataChange: BehaviorSubject<Raceresult[]> = new BehaviorSubject<Raceresult[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;



  constructor(private http: HttpClient) {
  }

  get data(): Raceresult[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  resetDialogData() {
    this.dialogData = null;
  }


  getAllRaces(raceclass: string, doggender:string, year: string): void {
    this.http.get<Raceresult[]>(AppSettings.raceRankingResultsUrl + raceclass + '/' + doggender + '/' + year).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }

}

