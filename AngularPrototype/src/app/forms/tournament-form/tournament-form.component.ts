import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tournament} from "../../data-models/tournament";
import {Club} from "../../data-models/club";

@Component({
  selector: 'app-tournament-form',
  templateUrl: './tournament-form.component.html',
  styleUrls: ['./tournament-form.component.css']
})
export class TournamentFormComponent implements OnInit {

  clubs: any;
  private getClubsUrl = 'http://localhost:8080/get/clubs';

  constructor(private http: HttpClient) {
    this.getClubs()
  }

  getClubs() {
    this.http.get<Club[]>(this.getClubsUrl).subscribe(clubs => this.clubs = clubs);
  }

  ngOnInit() {
  }

  model = new Tournament(0,'', '', new Club(1,'','','','',''),  new Date(2017, 11, 1));



  onSubmit() {
    const req = this.http.post(this.saveTournamentUrl, this.model);
    req.subscribe();
  }


  private saveTournamentUrl = 'http://localhost:8080/save/tournament';  // URL to web api
  tournamenttype = ['Ausstellung', 'Coursing', 'Rennen'];


}
