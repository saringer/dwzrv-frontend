import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Judge} from "../../data-models/judge";
import {Tournament} from "../../data-models/tournament";
import {Dogpass} from "../../data-models/dogpass";
import {TournamentDog} from "../../data-models/tournamentdog";

@Injectable()
export class TournamentDogService {

  private tournamentDogsUrl = 'http://localhost:8080/get/tournamentdogs';
  private saveDogTournamentUrl = 'http://localhost:8080/save/dogtournament';  // URL to web api
  private updateJudgeUrl = 'http://localhost:8080/update/judges/'




  dataChange: BehaviorSubject<TournamentDog[]> = new BehaviorSubject<TournamentDog[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private http: HttpClient) {
  }

  get data(): TournamentDog[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  resetDialogData() {
    this.dialogData = null;
  }

  getTournamentDogsAsArray() {
    return this.http.get<TournamentDog[]>(this.tournamentDogsUrl);
  }

  getAllTournamentDog(): void {
    this.http.get<TournamentDog[]>(this.tournamentDogsUrl).subscribe(data => {
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

  addTournamentDog (tournamentdog: TournamentDog): void {
    const req = this.http.post(this.saveDogTournamentUrl, tournamentdog);
    req.subscribe(tournamentdog => this.dialogData = tournamentdog);  }



}
