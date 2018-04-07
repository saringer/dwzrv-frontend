import {Component, Input, OnInit, PipeTransform, SimpleChanges} from '@angular/core';
import {Tournament} from "../../../data-models/tournament";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Judge} from "../../../data-models/judge";
import {Dogpass} from "../../../data-models/dogpass";
import {Observable} from "rxjs/Rx";
import {TournamentService} from "../../../services/TournamentService/tournament.service";
import {TournamentDogService} from "../../../services/TournamentDogService/tournamentdog.service";
import {DogService} from "../../../services/DogService/dog.service";
import {JudgeService} from "../../../services/JudgeService/judge.service";
import {Coursing} from "../../../data-models/coursing";
import {SearchService} from "../../../services/SearchService/search.service";


@Component({
  selector: 'app-manage-tournaments',
  templateUrl: './manage-tournaments.component.html',
  styleUrls: ['./manage-tournaments.component.css']
})
export class ManageTournamentsComponent implements OnInit {

  firstFormGroup: FormGroup;
  tournaments: Observable<Tournament[]>;


  list_all_judges: Judge[] = [];
  list_participating_judges: Judge[] = [];
  @Input() selected: any;
  stepperIndex: number;
  dragcontainer: string;

  filterJudge = {firstname: ''};

  constructor(private searchService: SearchService, private tournamentService: TournamentService, private _formBuilder: FormBuilder, private judgeService: JudgeService) {
    this.searchService.currentMessage.subscribe(message =>  this.filterJudge.firstname = message);
  }


// Check if the selected tournament passed via @Input() is changed
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.selected);
    if (this.selected != null) {
      this.searchService.resetFilter();
      //this.loadData();
    }

  }

  ngOnInit() {



    this.tournaments = this.tournamentService.getTournaments();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    //this.selected.valueChanges.forEach((tournament) => this.loadData());

  }


  formControl = new FormControl('', [
    Validators.required
  ]);





}


