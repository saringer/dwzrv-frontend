import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Judge} from "../../data-models/judge";
import {Tournament} from "../../data-models/tournament";
import {Dogpass} from "../../data-models/dogpass";
import {AppSettings} from "../../appsettings";

@Injectable()
export class JudgeService {






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

  getJudgesAsArray() {
    return this.http.get<Judge[]>(AppSettings.judgesUrl);
  }

  getAllJudges(): void {
    this.http.get<Judge[]>(AppSettings.judgesUrl).subscribe(data => {
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





  /**
   * Add Methods
   */

  addJudge (judge: Judge): void {
    const req = this.http.post(AppSettings.saveJudgeUrl, judge);
    req.subscribe(judge => this.dialogData = judge);  }

  updateJudge(judge: Judge): void {
    this.http.put(AppSettings.updateJudgeUrl + judge.id, judge).subscribe(data => {
        this.dialogData = judge;
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteJudge(id: number): void {
    this.http.delete(AppSettings.deleteJudgeUrl + id).subscribe(data => {

        //  this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

}
