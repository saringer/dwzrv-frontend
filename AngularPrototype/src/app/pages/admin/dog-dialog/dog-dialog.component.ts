import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {DogFormComponent} from "../../../forms/dog-form/dog-form.component";
import {OwnerFormComponent} from "../../../forms/owner-form/owner-form.component";
import {DogService} from "../../../services/DogService/dog.service";
import {Dogpass} from "../../../data-models/dogpass";

@Component({
  selector: 'app-dog-dialog',
  templateUrl: './dog-dialog.component.html',
  styleUrls: ['./dog-dialog.component.css']
})
export class DogDialogComponent implements OnInit {
  @ViewChild(DogFormComponent) dogForm: DogFormComponent;

  constructor(public dogService: DogService,
              @Inject(MAT_DIALOG_DATA) public data: Dogpass,
              private http: HttpClient,
              public dialogRef: MatDialogRef<DogDialogComponent>) { }

  ngOnInit() {
  }

  onCreateNewClick() {
    this.dogService.addDog(this.data);
    //console.log(this.data.name);
    this.dogForm.onSubmit();
    this.dialogRef.close();

  }

  onNoClick(): void {
    this.dialogRef.close();

  }




}


