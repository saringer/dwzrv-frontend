import {Component, Inject, OnInit} from '@angular/core';
import {JudgeDeleteDialogComponent} from "../../judge-dialog/judge-delete-dialog/judge-delete-dialog.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {JudgeService} from "../../../../../services/JudgeService/judge.service";
import {DogService} from "../../../../../services/DogService/dog.service";

@Component({
  selector: 'app-dog-delete-dialog',
  templateUrl: './dog-delete-dialog.component.html',
  styleUrls: ['./dog-delete-dialog.component.css']
})
export class DogDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DogDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dogService: DogService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dogService.deleteDog(this.data.id);
  }

}
