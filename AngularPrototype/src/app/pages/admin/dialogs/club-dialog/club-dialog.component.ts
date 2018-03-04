import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

import {Club} from "../../../../data-models/club";
import {ClubService} from "../../../../services/ClubService/club.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-club-dialog',
  templateUrl: './club-dialog.component.html',
  styleUrls: ['./club-dialog.component.css']
})
export class ClubDialogComponent implements OnInit {


  constructor(private http: HttpClient, public dialogRef: MatDialogRef<ClubDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Club, private clubService: ClubService) { }

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
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.clubService.addClub(this.data);
  }

}
