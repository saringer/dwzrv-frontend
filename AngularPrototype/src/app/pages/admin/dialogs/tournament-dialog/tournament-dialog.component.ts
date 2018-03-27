import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ClubService} from "../../../../services/ClubService/club.service";
import {Club} from "../../../../data-models/club";
import {TournamentService} from "../../../../services/TournamentService/tournament.service";
import {Tournament} from "../../../../data-models/tournament";
import {FormControl, Validators} from "@angular/forms";
import {AppSettings} from "../../../../appsettings";

@Component({
  selector: 'app-tournament-dialog',
  templateUrl: './tournament-dialog.component.html',
  styleUrls: ['./tournament-dialog.component.css']
})
export class TournamentDialogComponent implements OnInit {

  tournamenttype = ['Coursing','Rennen'];

  clubs: any;



  constructor(private http: HttpClient, public dialogRef: MatDialogRef<TournamentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Tournament, private tournamentService: TournamentService) {
    this.getClubs();
  }

  ngOnInit() {
  }

  getClubs() {
    this.http.get<Club[]>(AppSettings.getClubsUrl).subscribe(clubs => this.clubs = clubs);
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.tournamentService.addTournament(this.data);
  }

}
