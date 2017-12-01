import {Component, OnInit, ViewChild} from '@angular/core';
import {TournamentFormComponent} from "../../../forms/tournament-form/tournament-form.component";
import {HttpClient} from "@angular/common/http";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-tournament-dialog',
  templateUrl: './tournament-dialog.component.html',
  styleUrls: ['./tournament-dialog.component.css']
})
export class TournamentDialogComponent implements OnInit {

  @ViewChild(TournamentFormComponent) tournamentForm: TournamentFormComponent;


  constructor(private http: HttpClient, public dialogRef: MatDialogRef<TournamentDialogComponent>) { }

  ngOnInit() {
  }

  onCreateNewClick() {
    this.tournamentForm.onSubmit();
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
