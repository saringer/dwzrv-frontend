import {Component, Inject, OnInit} from '@angular/core';
import {CoursingDetailDialogComponent} from "../../../coursing/dialogs/coursing-detail-dialog/coursing-detail-dialog.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-race-detail-dialog',
  templateUrl: './race-detail-dialog.component.html',
  styleUrls: ['./race-detail-dialog.component.css']
})
export class RaceDetailDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<RaceDetailDialogComponent>,
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {

  }

}
