import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {BreederService} from "../../../../../services/BreederService/breeder.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-breeder-edit-dialog',
  templateUrl: './breeder-edit-dialog.component.html',
  styleUrls: ['./breeder-edit-dialog.component.css']
})
export class BreederEditDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BreederEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public breederService: BreederService) { }

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

  stopEdit(): void {
    this.breederService.updateBreeder(this.data);
  }

}
