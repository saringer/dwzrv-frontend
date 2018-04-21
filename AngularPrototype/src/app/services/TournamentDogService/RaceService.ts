import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AppSettings} from "../../appsettings";
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

  updateRaceDistance(dogID: number, tournamentID: number, raceDistance: string): void {
    this.http.put(AppSettings.updateRaceDistanceUrl + dogID + '/' + tournamentID , raceDistance).subscribe(data => {
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }


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

  loadAllRacesByTournamentId(tournament_id): void {
    this.http.get<Race[]>(AppSettings.getRacesUrl + tournament_id).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }

  getAllRacesByTournamentId(tournament_id: number) {
    // now returns an Observable of Config
    return this.http.get<Race[]>(AppSettings.getRacesUrl + tournament_id);
    //return this.http.get<Tournament>(AppSettings.getTournamentUrl + tournament_id);
  }



}
