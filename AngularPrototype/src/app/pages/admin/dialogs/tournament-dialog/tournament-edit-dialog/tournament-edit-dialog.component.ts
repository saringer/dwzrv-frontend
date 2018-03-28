import {Component, Inject, OnInit} from '@angular/core';
import {OwnerEditDialogComponent} from "../../owner-dialog/owner-edit-dialog/owner-edit-dialog.component";
import {FormControl, Validators} from "@angular/forms";
import {OwnerService} from "../../../../../services/OwnerService/owner.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TournamentService} from "../../../../../services/TournamentService/tournament.service";
import {Club} from "../../../../../data-models/club";
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../../../../../appsettings";
import {Breeder} from "../../../../../data-models/breeder";

@Component({
  selector: 'app-tournament-edit-dialog',
  templateUrl: './tournament-edit-dialog.component.html',
  styleUrls: ['./tournament-edit-dialog.component.css']
})
export class TournamentEditDialogComponent implements OnInit {

  clubs: Club[];
  tournamenttype = ['Coursing', 'Rennen'];


  constructor(private http: HttpClient, public dialogRef: MatDialogRef<TournamentEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public tournamentService: TournamentService) {
    this.getClubs();
  }

  getClubs() {
    this.http.get<Club[]>(AppSettings.getClubsUrl).subscribe(clubs => this.clubs = clubs);

  }


  log(val) { console.log(val); }

  compareFn(c1: Club, c2: Club): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  ngOnInit() {
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
