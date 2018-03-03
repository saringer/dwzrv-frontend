import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AppSettings} from "../../appsettings";
import {TournamentDog} from "../../data-models/tournamentdog";

@Injectable()
export class TournamentDogService {






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

  /**
   * Get Methods
   *
   */


  getTournamentDogsAsArray() {
    return this.http.get<TournamentDog[]>(AppSettings.getTournamentDogsUrl);
  }

  getAllTournamentDog(): void {
    this.http.get<TournamentDog[]>(AppSettings.getTournamentDogsUrl).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }




  // Add Method

  addTournamentDog (tournamentdog: TournamentDog): void {
    const req = this.http.post(AppSettings.saveTournamentDogUrl, tournamentdog);
    req.subscribe(tournamentdog => this.dialogData = tournamentdog);  }


  // Delete Method
  deleteItem(dog_id: number, tournament_id): void {
    this.http.delete(AppSettings.deleteTournamentDogUrl + dog_id + '/' + tournament_id).subscribe(data => {
        console.log(AppSettings.deleteTournamentDogUrl + dog_id + '/' + tournament_id);
       // this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }


}
