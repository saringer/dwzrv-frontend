import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {OwnerFormComponent} from "../../../../forms/owner-form/owner-form.component";
import {DogService} from "../../../../services/DogService/dog.service";
import {Dogpass} from "../../../../data-models/dogpass";
import {Breeder} from "../../../../data-models/breeder";
import {Dogowner} from "../../../../data-models/dogowner";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-dog-dialog',
  templateUrl: './dog-dialog.component.html',
  styleUrls: ['./dog-dialog.component.css']
})
export class DogDialogComponent implements OnInit {
  sex = ['male', 'female'];
  owners: Dogowner[];
  breeders: Breeder[];
  private getOwnersUrl = 'http://localhost:8080/get/owners';
  private getBreedersUrl = 'http://localhost:8080/get/breeders';


  constructor(public dogService: DogService,
              @Inject(MAT_DIALOG_DATA) public data: Dogpass,
              private http: HttpClient,
              public dialogRef: MatDialogRef<DogDialogComponent>) {
    this.getOwners();
    this.getBreeders();
  }

  ngOnInit() {
  }

  getBreeders() {
    this.http.get<Breeder[]>(this.getBreedersUrl).subscribe(breeders => this.breeders = breeders);
  }
  getOwners() {
    this.http.get<Dogowner[]>(this.getOwnersUrl).subscribe(owners => this.owners = owners);
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
    this.dogService.addDog(this.data);
  }




}


