import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AppSettings} from "../../appsettings";
import {Coursing} from "../../data-models/coursing";
import {Race} from "../../data-models/race";

@Injectable()
export class TournamentDogService {






  dataChange: BehaviorSubject<Coursing[]> = new BehaviorSubject<Coursing[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private http: HttpClient) {
  }

  get data(): Coursing[] {
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



  getAllTournamentDogCoursingsByTournamentId(tournament_id): void {
    this.http.get<Coursing[]>(AppSettings.getTournamentDogsUrl + tournament_id).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }


  // Add Method

  addTournamentDog (tournamentdog: Coursing): void {
    const req = this.http.post(AppSettings.saveTournamentDogUrl, tournamentdog);
    req.subscribe(tournamentdog => this.dialogData = tournamentdog);  }




  // Delete Method
  deleteCoursing(dog_id: number, tournament_id): void {
    this.http.delete(AppSettings.deleteTournamentDogUrl + dog_id + '/' + tournament_id).subscribe(data => {
       // this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }



}
