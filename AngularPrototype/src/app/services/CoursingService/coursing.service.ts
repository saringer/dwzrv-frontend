import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Judge} from "../../data-models/judge";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AppSettings} from "../../appsettings";
import {Coursingresult} from "../../data-models/coursingresult";

@Injectable()
export class CoursingService {

  dataChange: BehaviorSubject<Coursingresult[]> = new BehaviorSubject<Coursingresult[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;



  constructor(private http: HttpClient) {
  }

  get data(): Coursingresult[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  resetDialogData() {
    this.dialogData = null;
  }


  getAllCoursings(coursingclass: string, doggender:string, year: string): void {
    this.http.get<Coursingresult[]>(AppSettings.coursingResultsUrl + coursingclass + '/' + doggender + '/' + year).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }

}
