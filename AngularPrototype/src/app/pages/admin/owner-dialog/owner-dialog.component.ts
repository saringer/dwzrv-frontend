import {Component, OnInit, ViewChild} from '@angular/core';
import {OwnerFormComponent} from "../../../forms/owner-form/owner-form.component";
import {DogDialogComponent} from "../dog-dialog/dog-dialog.component";
import {MatDialogRef} from "@angular/material";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-owner-dialog',
  templateUrl: './owner-dialog.component.html',
  styleUrls: ['./owner-dialog.component.css']
})
export class OwnerDialogComponent implements OnInit {
  @ViewChild(OwnerFormComponent) ownerForm: OwnerFormComponent;


  constructor(private http: HttpClient, public dialogRef: MatDialogRef<DogDialogComponent>) { }

  ngOnInit() {
  }

  onCreateNewClick() {
    this.ownerForm.onSubmit();
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
