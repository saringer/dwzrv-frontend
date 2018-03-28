import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Rx";
import {TournamentDogService} from "../../../services/TournamentDogService/tournamentdog.service";
import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Coursing} from "../../../data-models/coursing";
import {Tournament} from "../../../data-models/tournament";
import {TournamentService} from "../../../services/TournamentService/tournament.service";
import {SearchService} from "../../../services/SearchService/search.service";

@Component({
  selector: 'app-manage-tournament-evaluations',
  templateUrl: './manage-tournament-evaluations.component.html',
  styleUrls: ['./manage-tournament-evaluations.component.css']
})
export class ManageTournamentEvaluationsComponent implements OnInit {


  tournaments: Observable<Tournament[]>;
  displayedColumnsTournamentDog = ['dogname', 'coursing'];
  firstFormGroup: FormGroup;
  selected_awarding: any;

  constructor(private searchService: SearchService,
              public dialog: MatDialog,
              private tournamentDogService: TournamentDogService,
              private _formBuilder: FormBuilder,
              private tournamentService: TournamentService) {
  }

  datetostring(milliseconds: number): String {
    return new Date(milliseconds).toLocaleDateString();
  }

  ngOnInit() {

    this.tournaments = this.tournamentService.getTournaments();


    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);




  stepperSelectionChangeDogJudgement(event) {
    //this.tournamentDogService.getAllTournamentDogForTournamentI(this.selected_awarding.id);
    //this.tournamentDogService.getAllTournamentDog();
    this.tournamentDogService.getAllTournamentDogCoursingsByTournamentId(this.selected_awarding.id)

    if (this.selected_awarding.tournamenttype == 'Coursing') {
      this.displayedColumnsTournamentDog = ['dogname', 'coursing'];
    }
    if (this.selected_awarding.tournamenttype == 'Ausstellung') {
      this.displayedColumnsTournamentDog = ['dogname', 'exhibition'];
    }
    if (this.selected_awarding.tournamenttype == 'Rennen') {
      this.displayedColumnsTournamentDog = ['dogname', 'race'];
    }


  }




}
