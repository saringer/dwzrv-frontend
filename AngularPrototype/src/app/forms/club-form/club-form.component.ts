import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Club} from "../../data-models/club";

@Component({
  selector: 'app-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.css']
})
export class ClubFormComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  model = new Club(0, '', '', '', '', '', null);

  onSubmit() {
    const req = this.http.post(this.saveClubUrl, this.model);
    req.subscribe();
  }



  private saveClubUrl = 'http://localhost:8080/save/club';  // URL to web api
}
