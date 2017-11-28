import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Dogowner} from '../../data-models/dogowner'

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.css']
})
export class OwnerFormComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  sex = ['male', 'female'];
  clickMessage = '';

  model = new Dogowner(0,'Harry', 'Schmitt', '', 'Chuck Overstreet', 'red', '', new Date(2013, 11, 1));

  onSubmit() {
    console.log("Test")
    const req = this.http.post(this.saveDogpassUrl, this.model);
    this.clickMessage = "submit sent";
    req.subscribe();
  }


  private saveDogpassUrl = 'http://localhost:8080/save';  // URL to web api
  private searchDogpassUrl = 'http://localhost:8080/search';  // URL to web api
}
