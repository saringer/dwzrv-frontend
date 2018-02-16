import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {TournamentFormComponent} from "../../../../forms/tournament-form/tournament-form.component";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ClubService} from "../../../../services/ClubService/club.service";
import {Club} from "../../../../data-models/club";
import {TournamentService} from "../../../../services/TournamentService/tournament.service";
import {Tournament} from "../../../../data-models/tournament";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-tournament-dialog',
  templateUrl: './tournament-dialog.component.html',
  styleUrls: ['./tournament-dialog.component.css']
})
export class TournamentDialogComponent implements OnInit {

  @ViewChild(TournamentFormComponent) tournamentForm: TournamentFormComponent;
  tournamenttype = ['Ausstellung', 'Coursing', 'Rennen'];

  clubs: any;
  private getClubsUrl = 'http://localhost:8080/get/clubs';



  constructor(private http: HttpClient, public dialogRef: MatDialogRef<TournamentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Tournament, private tournamentService: TournamentService) {
    this.getClubs();
  }

  ngOnInit() {
  }

  getClubs() {
    this.http.get<Club[]>(this.getClubsUrl).subscribe(clubs => this.clubs = clubs);
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
