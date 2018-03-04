import {Component, Inject, OnInit} from '@angular/core';
import {BreederDeleteDialogComponent} from "../../breeder-dialog/breeder-delete-dialog/breeder-delete-dialog.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ClubService} from "../../../../../services/ClubService/club.service";

@Component({
  selector: 'app-club-delete-dialog',
  templateUrl: './club-delete-dialog.component.html',
  styleUrls: ['./club-delete-dialog.component.css']
})
export class ClubDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ClubDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public clubService: ClubService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.clubService.deleteClub(this.data.id);
  }

}
