import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Rx";
import {TournamentDogService} from "../../../services/TournamentDogService/tournamentdog.service";
import {Tournament} from "../../../data-models/tournament";
import {TournamentService} from "../../../services/TournamentService/tournament.service";
import {SearchService} from "../../../services/SearchService/search.service";

import { catchError, map, tap,startWith, switchMap, debounceTime, distinctUntilChanged, takeWhile, first } from 'rxjs/operators';

@Component({
  selector: 'app-manage-tournament-evaluations',
  templateUrl: './manage-tournament-evaluations.component.html',
  styleUrls: ['./manage-tournament-evaluations.component.css']
})
export class ManageTournamentEvaluationsComponent implements OnInit {


  tournaments: Observable<Tournament[]>;
  //tournaments: Tournament[];
  firstFormGroup: FormGroup;
  @Input() selected_awarding: any;
  //filteredTournaments: Observable<Tournament[]>;

  constructor(private searchService: SearchService,
              public dialog: MatDialog,
              private tournamentDogService: TournamentDogService,
              private _formBuilder: FormBuilder,
              private tournamentService: TournamentService) {

    /*this.filteredTournaments = this.formControl.valueChanges
      .pipe(
        startWith(null),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filter(val || '')
        })
      );*/

  }

  datetostring(milliseconds: number): String {
    return new Date(milliseconds).toLocaleDateString();
  }

  ngOnInit() {

    this.tournaments = this.tournamentService.getTournaments();
    //this.tournamentService.getTournaments().subscribe(tournaments => this.tournaments = this.tournaments);


    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);



  /*filter(val: string): Observable<any[]> {
    return this.tournamentService.getTournaments()
      .pipe(
        map(response => response.filter(option => {
          return option.title.toLowerCase().indexOf(val.toLowerCase()) !== -1
        }))
      )
  }


  displayFn(country:Tournament): string {
    this.selected_awarding = country;
    console.log(this.selected_awarding);
    return country.title;
  }

  test(event) {
    this.selected_awarding = event;
    console.log(event)
  }*/




}
