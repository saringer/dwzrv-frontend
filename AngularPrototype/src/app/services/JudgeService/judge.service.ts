import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Breeder} from "../../data-models/breeder";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Tournament} from "../../data-models/tournament";
import {Judge} from "../../data-models/judge";

@Injectable()
export class JudgeService {

  private judgesUrl = 'http://localhost:8080/get/judges';
  private saveJudgeUrl = 'http://localhost:8080/save/judge';  // URL to web api



  dataChange: BehaviorSubject<Judge[]> = new BehaviorSubject<Judge[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private http: HttpClient) {
  }

  get data(): Judge[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  resetDialogData() {
    this.dialogData = null;
  }

  getAllTournaments(): void {
    this.http.get<Judge[]>(this.judgesUrl).subscribe(data => {
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
    return this.http.get<Tournament[]>(this.judgesUrl);
  }


  /**
   * Add Methods
   */

  addJudge (judge: Judge): void {
    const req = this.http.post(this.saveJudgeUrl, judge);
    req.subscribe(judge => this.dialogData = judge);  }

}
