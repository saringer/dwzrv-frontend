import {Component, Inject, OnInit} from '@angular/core';
import {OwnerService} from "../../../../../services/OwnerService/owner.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-owner-delete-dialog',
  templateUrl: './owner-delete-dialog.component.html',
  styleUrls: ['./owner-delete-dialog.component.css']
})
export class OwnerDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OwnerDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public ownerService: OwnerService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.ownerService.deleteOwner(this.data.id);
  }

}
