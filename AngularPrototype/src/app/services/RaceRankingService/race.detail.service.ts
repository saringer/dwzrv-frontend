import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AppSettings} from "../../appsettings";
import {Racedetail} from "../../data-models/racedetail";

@Injectable()
export class RaceDetailService {




  dataChange: BehaviorSubject<Racedetail[]> = new BehaviorSubject<Racedetail[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private http: HttpClient) {
  }

  get data(): Racedetail[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllRaceDetailsForDog(dog_id: number, race_class: string, year: string): void {
    console.log(AppSettings.raceDetailsUrl + dog_id + '/' + race_class + '/' +  year);
    this.http.get<Racedetail[]>(AppSettings.raceDetailsUrl + dog_id + '/' + race_class + '/' +  year ).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }




}
