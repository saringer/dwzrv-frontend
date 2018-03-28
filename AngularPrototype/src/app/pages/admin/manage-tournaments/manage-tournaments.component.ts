import {Component, OnInit, PipeTransform} from '@angular/core';
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
  selected: any;
  stepperIndex: number;
  dragcontainer: string;

  filterJudge = {firstname: ''};

  constructor(private searchService: SearchService, private tournamentService: TournamentService, private tournamentDogService: TournamentDogService, private _formBuilder: FormBuilder,
              private dogService: DogService, private judgeService: JudgeService) {
    this.searchService.currentMessage.subscribe(message =>  this.filterJudge.firstname = message);
  }

  datetostring(milliseconds: number): String {
    return new Date(milliseconds).toLocaleDateString();
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

  dragStart(container: string) {
    this.dragcontainer = container;
  }



  onParticipatingJudgesDrop(e: any) {
    // Get the dropped data here
    if (!this.judgeIsAlreadyInList(e.dragData.id, this.list_participating_judges)) {


      this.list_participating_judges.push(e.dragData);
      var i = this.list_all_judges.findIndex(i => i.id === e.dragData.id);
      this.list_all_judges.splice(i, 1);
      this.selected.participating_judges = this.list_participating_judges;
      this.tournamentService.updateTournament(this.selected);
    }

  }

  onAllJudgesDrop(e: any) {
    // Get the dropped data here
    if (!this.judgeIsAlreadyInList(e.dragData.id, this.list_all_judges)) {


      this.list_all_judges.push(e.dragData);
      var i = this.list_participating_judges.findIndex(i => i.id === e.dragData.id);
      this.list_participating_judges.splice(i, 1);
      this.tournamentService.updateTournament(this.selected);
    }
  }

  stepperSelectionChange(event) {
    this.stepperIndex = event.selectedIndex;
    if (this.stepperIndex == 1) {
      this.tournamentService.getTournamentById(this.selected.id).subscribe(tournament => this.selected = tournament);
      this.loadData();
    }

  }

  loadData() {

    this.list_participating_judges = this.selected.participating_judges;
    // Load available judges
    this.judgeService.getJudgesAsArray().subscribe(judges => this.list_all_judges = judges.filter(judge => this.customFilterJudge(judge, this.list_participating_judges)));


  }




  customFilterJudge(element: Judge, array: Judge[]): boolean {
    var result = true;
    for (var i = 0; i < array.length; i++) {
      if (element.id === array[i].id) {
        console.log('element' + element.id)
        console.log('array' + array[i].id)

        result = false;
        break;
      }
    }
    return result;
  }





  judgeIsAlreadyInList(judgeid: number, judges: Judge[]): boolean {
    var result: boolean = false;
    for (var i = 0; i < judges.length; i++) {
      if (judgeid === judges[i].id) {
        result = true;
        break;
      }
    }
    return result;
  }



}


