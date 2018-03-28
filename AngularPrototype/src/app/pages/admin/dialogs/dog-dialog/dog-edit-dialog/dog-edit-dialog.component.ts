import {Component, Inject, OnInit} from '@angular/core';
import {JudgeEditComponent} from "../../judge-dialog/judge-edit-dialog/judge-edit.component";
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {JudgeService} from "../../../../../services/JudgeService/judge.service";
import {DogService} from "../../../../../services/DogService/dog.service";
import {Breeder} from "../../../../../data-models/breeder";
import {Dogowner} from "../../../../../data-models/dogowner";
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../../../../../appsettings";

@Component({
  selector: 'app-dog-edit-dialog',
  templateUrl: './dog-edit-dialog.component.html',
  styleUrls: ['./dog-edit-dialog.component.css']
})
export class DogEditDialogComponent implements OnInit {

  sex = ['Rüde', 'Hündin'];
  race = ['Afghanischer Windhund', 'Azawakh', 'Barsoi', 'Chart Polski', 'Deerhound', 'Greyhound', 'Galgo Español', 'Irischer Wolfshund',
    'Italienisches Windspiel', 'Magyar agár', 'Saluki', 'Sloughi', 'Silken Windsprite', 'Whippet'];
  owners: Dogowner[];
  breeders: Breeder[];


  constructor(public dialogRef: MatDialogRef<DogEditDialogComponent>, private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: any, public dogService: DogService) {
    this.getOwners();
    this.getBreeders();
  }

  log(val) { console.log(val); }

  compareBreeders(c1: Breeder, c2: Breeder): boolean {

    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareOwners(c1: Dogowner, c2: Dogowner): boolean {

    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }



  ngOnInit() {
  }

  getBreeders() {
    this.http.get<Breeder[]>(AppSettings.getBreedersUrl).subscribe(breeders => this.breeders = breeders);
  }
  getOwners() {
    this.http.get<Dogowner[]>(AppSettings.getOwnersUrl).subscribe(owners => this.owners = owners);
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
    this.dogService.updateDog(this.data);
  }

}
