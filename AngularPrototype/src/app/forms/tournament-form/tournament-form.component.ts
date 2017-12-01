import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tournament} from "../../data-models/tournament";

@Component({
  selector: 'app-tournament-form',
  templateUrl: './tournament-form.component.html',
  styleUrls: ['./tournament-form.component.css']
})
export class TournamentFormComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  model = new Tournament(0,'Nationales Turnier', 'Coursing', 'Lettestrasse 4', '10437', 'Berlin', 'Deutschland',  new Date(2017, 11, 1));



  onSubmit() {
    const req = this.http.post(this.saveOwnerUrl, this.model);
    req.subscribe();
  }


  private saveOwnerUrl = 'http://localhost:8080/save/tournament';  // URL to web api
  tournamenttype = ['Coursing', 'Rennen', 'Ausstellung'];


}
