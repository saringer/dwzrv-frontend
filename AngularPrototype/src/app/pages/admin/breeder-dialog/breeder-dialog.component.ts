import {Component, OnInit, ViewChild} from '@angular/core';
import {BreederFormComponent} from "../../../forms/breeder-form/breeder-form.component";
import {HttpClient} from "@angular/common/http";
import {DogDialogComponent} from "../dog-dialog/dog-dialog.component";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-breeder-dialog',
  templateUrl: './breeder-dialog.component.html',
  styleUrls: ['./breeder-dialog.component.css']
})
export class BreederDialogComponent implements OnInit {
  @ViewChild(BreederFormComponent) breederForm: BreederFormComponent;


  constructor(private http: HttpClient, public dialogRef: MatDialogRef<BreederDialogComponent>) { }

  ngOnInit() {
  }

  onCreateNewClick() {
    this.breederForm.onSubmit();
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
