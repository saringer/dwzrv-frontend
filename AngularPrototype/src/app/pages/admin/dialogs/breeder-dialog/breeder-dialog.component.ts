import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DogDialogComponent} from "../dog-dialog/dog-dialog.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Breeder} from "../../../../data-models/breeder";
import {FormControl, Validators} from '@angular/forms';
import {BreederService} from "../../../../services/BreederService/breeder.service";

@Component({
  selector: 'app-breeder-dialog',
  templateUrl: './breeder-dialog.component.html',
  styleUrls: ['./breeder-dialog.component.css']
})
export class BreederDialogComponent implements OnInit {

  affixes: string[] = ['prefix','suffix'];


  constructor(private http: HttpClient, public dialogRef: MatDialogRef<BreederDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Breeder, private breederService: BreederService) {
    // kennelname affix is set as suffix by default
    data.affix = 'suffix'
  }

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

  public confirmAdd(): void {
    this.breederService.addBreeder(this.data);
  }

}
