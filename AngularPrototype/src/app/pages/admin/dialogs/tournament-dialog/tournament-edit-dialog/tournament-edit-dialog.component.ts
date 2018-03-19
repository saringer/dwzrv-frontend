import {Component, Inject, OnInit} from '@angular/core';
import {OwnerEditDialogComponent} from "../../owner-dialog/owner-edit-dialog/owner-edit-dialog.component";
import {FormControl, Validators} from "@angular/forms";
import {OwnerService} from "../../../../../services/OwnerService/owner.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TournamentService} from "../../../../../services/TournamentService/tournament.service";
import {Club} from "../../../../../data-models/club";
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../../../../../appsettings";

@Component({
  selector: 'app-tournament-edit-dialog',
  templateUrl: './tournament-edit-dialog.component.html',
  styleUrls: ['./tournament-edit-dialog.component.css']
})
export class TournamentEditDialogComponent implements OnInit {

  clubs: any;
  tournamenttype = ['Coursing'];


  constructor(private http: HttpClient, public dialogRef: MatDialogRef<TournamentEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public tournamentService: TournamentService) {
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
    // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.tournamentService.updateTournament(this.data);
  }

}
