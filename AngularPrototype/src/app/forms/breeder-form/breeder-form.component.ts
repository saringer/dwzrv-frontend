import { Component, OnInit } from '@angular/core';
import {Breeder} from "../../data-models/breeder";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-breeder-form',
  templateUrl: './breeder-form.component.html',
  styleUrls: ['./breeder-form.component.css']
})
export class BreederFormComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  model = new Breeder(0,'', '', '', '', '', '', '');

  onSubmit() {
    const req = this.http.post(this.saveBreederUrl, this.model);
    req.subscribe();
  }



  private saveBreederUrl = 'http://localhost:8080/save/breeder';  // URL to web api

}
