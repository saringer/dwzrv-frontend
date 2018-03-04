import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {BreederService} from "../../../../../services/BreederService/breeder.service";

@Component({
  selector: 'app-breeder-delete-dialog',
  templateUrl: './breeder-delete-dialog.component.html',
  styleUrls: ['./breeder-delete-dialog.component.css']
})
export class BreederDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BreederDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public breederService: BreederService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.breederService.deleteBreeder(this.data.id);
  }

}
