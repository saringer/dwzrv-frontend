import {Component, Inject, OnInit} from '@angular/core';
import {OwnerDeleteDialogComponent} from "../../owner-dialog/owner-delete-dialog/owner-delete-dialog.component";
import {OwnerService} from "../../../../../services/OwnerService/owner.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TournamentService} from "../../../../../services/TournamentService/tournament.service";

@Component({
  selector: 'app-tournament-delete-dialog',
  templateUrl: './tournament-delete-dialog.component.html',
  styleUrls: ['./tournament-delete-dialog.component.css']
})
export class TournamentDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OwnerDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public tournamentService: TournamentService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.tournamentService.deleteTournament(this.data.id);
  }

}
