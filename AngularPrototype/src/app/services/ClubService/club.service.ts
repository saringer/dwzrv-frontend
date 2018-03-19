import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Breeder} from "../../data-models/breeder";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Club} from "../../data-models/club";
import {AppSettings} from "../../appsettings";

@Injectable()
export class ClubService {




  dataChange: BehaviorSubject<Club[]> = new BehaviorSubject<Club[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private http: HttpClient) {
  }

  get data(): Club[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllClubs(): void {
    this.http.get<Club[]>(AppSettings.clubsUrl).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }

  addClub (club: Club): void {
    console.log(AppSettings.saveClubUrl);
    const req = this.http.post(AppSettings.saveClubUrl, club);
    req.subscribe(club => this.dialogData = club);
  }

  updateClub(club: Club): void {
    this.http.put(AppSettings.updateClubUrl + club.id, club).subscribe(data => {
        this.dialogData = club;
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteClub(id: number): void {
    this.http.delete(AppSettings.deleteClubUrl + id).subscribe(data => {

        //  this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

}
