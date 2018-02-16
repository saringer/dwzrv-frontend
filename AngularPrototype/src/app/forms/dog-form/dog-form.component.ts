import { Component, OnInit } from '@angular/core';
import {Dogpass} from '../../data-models/dogpass'
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SelectItem} from 'primeng/primeng'
import {Dogowner} from "../../data-models/dogowner";
import {Observable} from "rxjs/Observable";
import {Breeder} from "../../data-models/breeder";
import {DogService} from "../../services/DogService/dog.service";


@Component({
  selector: 'app-dog-form',
  templateUrl: './dog-form.component.html',
  styleUrls: ['./dog-form.component.css'],

})
export class DogFormComponent implements OnInit {
  owners: Dogowner[];
  breeders: Breeder[];
  private getOwnersUrl = 'http://localhost:8080/get/owners';
  private getBreedersUrl = 'http://localhost:8080/get/breeders';

  constructor(private http: HttpClient, private dogService: DogService) {

    this.getOwners();
    this.getBreeders();
  }






  getBreeders() {
    this.http.get<Breeder[]>(this.getBreedersUrl).subscribe(breeders => this.breeders = breeders);
  }
  getOwners() {
     this.http.get<Dogowner[]>(this.getOwnersUrl).subscribe(owners => this.owners = owners);
  }

  sex = ['male', 'female'];
//new Dogowner(1,'Harry', 'Schmitt', '', 'Chuck Overstreet', 'red', '', new Date(2017, 11, 1))
  model = new Dogpass(null,null, null, null, null, null, null, null, new Date(2017, 11, 1),null);
  submitted = false;
  items: Array<string>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
// HTTP GUIDE

  onSubmit() {
    //const req = this.http.post(this.saveDogpassUrl, this.model);
    // We post the dialog data to the server and subscribe for the created entity
    //this.dogService.addDog(this.model).subscribe(dog => this.dogService.dialogData = dog);



  }



  private saveDogpassUrl = 'http://localhost:8080/save/dog';  // URL to web api

  private searchDogpassUrl = 'http://localhost:8080/search';  // URL to web api



  ngOnInit() {
  }

}
