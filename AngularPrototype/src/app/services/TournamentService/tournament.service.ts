import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Breeder} from "../../data-models/breeder";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Tournament} from "../../data-models/tournament";
import {AppSettings} from "../../appsettings";

@Injectable()
export class TournamentService {




  dataChange: BehaviorSubject<Tournament[]> = new BehaviorSubject<Tournament[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private http: HttpClient) {
  }

  get data(): Tournament[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  resetDialogData() {
    this.dialogData = null;
  }

  getAllTournaments(): void {
    this.http.get<Tournament[]>(AppSettings.tournamentsUrl).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  /**
   * Get Methods
   *
   */

  getTournamentById(tournament_id: number) {
    // now returns an Observable of Config
   return this.http.get<Tournament>(AppSettings.getTournamentUrl + tournament_id);
  }

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(AppSettings.tournamentsUrl);
  }

  getTournamentsAsArray() {
    return this.http.get<Tournament[]>(AppSettings.tournamentsUrl);
  }


  /**
   * Add Methods
   */

  addTournament(tournament: Tournament): void {
    const req = this.http.post(AppSettings.saveTournamentUrl, tournament);
    req.subscribe(tournament => this.dialogData = tournament);
  }

  updateTournament(tournament: Tournament): void {
    this.http.put(AppSettings.updateTournamentUrl + tournament.id, tournament).subscribe();
  }



}
