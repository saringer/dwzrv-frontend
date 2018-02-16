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



  model = new Dogowner(0,'', '', '', '', '', '', new Date(2017, 11, 1));

  onSubmit() {
    const req = this.http.post(this.saveOwnerUrl, this.model);
    req.subscribe();
  }


  private saveOwnerUrl = 'http://localhost:8080/save/owner';  // URL to web api
}
