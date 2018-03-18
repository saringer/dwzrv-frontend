import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {JudgeService} from "../../../../../services/JudgeService/judge.service";

@Component({
  selector: 'app-judge-delete-dialog',
  templateUrl: './judge-delete-dialog.component.html',
  styleUrls: ['./judge-delete-dialog.component.css']
})
export class JudgeDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<JudgeDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public judgeService: JudgeService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.judgeService.deleteJudge(this.data.id);
  }
}
