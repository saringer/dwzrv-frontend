import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AppSettings} from "../../appsettings";
import {Coursing} from "../../data-models/coursing";
import {Race} from "../../data-models/race";

@Injectable()
export class RaceService {






  dataChange: BehaviorSubject<Race[]> = new BehaviorSubject<Race[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private http: HttpClient) {
  }

  get data(): Race[] {
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

  addTournamentDogRace (tournamentdog: Race): void {
    const req = this.http.post(AppSettings.saveTournamentDogRaceUrl, tournamentdog);
    req.subscribe(tournamentdog => this.dialogData = tournamentdog);  }


  // Delete Method
  deleteRace(dog_id: number, tournament_id): void {
    this.http.delete(AppSettings.deleteTournamentDogRaceUrl + dog_id + '/' + tournament_id).subscribe(data => {
        // this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  getAllRacesByTournamentId(tournament_id): void {
    this.http.get<Race[]>(AppSettings.getRacesUrl + tournament_id).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }


}
