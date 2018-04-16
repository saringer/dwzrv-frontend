import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {JudgeDeleteDialogComponent} from "../../../admin/dialogs/judge-dialog/judge-delete-dialog/judge-delete-dialog.component";
import {JudgeService} from "../../../../services/JudgeService/judge.service";

@Component({
  selector: 'app-coursing-detail-dialog',
  templateUrl: './coursing-detail-dialog.component.html',
  styleUrls: ['./coursing-detail-dialog.component.css']
})
export class CoursingDetailDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CoursingDetailDialogComponent>,
             ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {

  }

}
