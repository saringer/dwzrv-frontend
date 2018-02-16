import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {OwnerFormComponent} from "../../../../forms/owner-form/owner-form.component";
import {DogDialogComponent} from "../dog-dialog/dog-dialog.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {Breeder} from "../../../../data-models/breeder";
import {BreederService} from "../../../../services/BreederService/breeder.service";
import {Dogowner} from "../../../../data-models/dogowner";
import {OwnerService} from "../../../../services/OwnerService/owner.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-owner-dialog',
  templateUrl: './owner-dialog.component.html',
  styleUrls: ['./owner-dialog.component.css']
})
export class OwnerDialogComponent implements OnInit {
  @ViewChild(OwnerFormComponent) ownerForm: OwnerFormComponent;


  constructor(private http: HttpClient, public dialogRef: MatDialogRef<OwnerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Dogowner, private ownerService: OwnerService) { }

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

  public confirmAdd(): void {
    this.ownerService.addOwner(this.data);
  }

}
