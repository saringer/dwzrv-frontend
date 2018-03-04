import {Component, Inject, OnInit} from '@angular/core';
import {OwnerService} from "../../../../../services/OwnerService/owner.service";
import {Dogowner} from "../../../../../data-models/dogowner";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-owner-edit-dialog',
  templateUrl: './owner-edit-dialog.component.html',
  styleUrls: ['./owner-edit-dialog.component.css']
})
export class OwnerEditDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OwnerEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public ownerService: OwnerService) { }

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
    this.ownerService.updateOwner(this.data);
  }

}
