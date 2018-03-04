import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ClubService} from "../../../../../services/ClubService/club.service";

@Component({
  selector: 'app-club-edit-dialog',
  templateUrl: './club-edit-dialog.component.html',
  styleUrls: ['./club-edit-dialog.component.css']
})
export class ClubEditDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ClubEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public clubService: ClubService) { }

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
    this.clubService.updateClub(this.data);
  }

}
