import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Judge} from "../../../../data-models/judge";
import {JudgeService} from "../../../../services/JudgeService/judge.service";
import {TournamentService} from "../../../../services/TournamentService/tournament.service";
import {SearchService} from "../../../../services/SearchService/search.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-set-up-judge',
  templateUrl: './set-up-judge.component.html',
  styleUrls: ['./set-up-judge.component.css']
})
export class SetUpJudgeComponent implements OnInit {
  filterJudge = {firstname: ''};

  list_all_judges: Judge[] = [];
  list_participating_judges: Judge[] = [];
  @Input() selected: any;
  stepperIndex: number;
  dragcontainer: string;


  constructor(private searchService: SearchService, private tournamentService: TournamentService, private _formBuilder: FormBuilder,
              private judgeService: JudgeService) {
    this.searchService.currentMessage.subscribe(message => this.filterJudge.firstname = message);
  }

  ngOnInit() {
  }

  // Check if the selected tournament passed via @Input() is changed
  ngOnChanges(changes: SimpleChanges): void {

    this.tournamentService.getTournamentById(this.selected.id).subscribe(tournament => this.loadOnServerResponse(tournament));

  }

  loadOnServerResponse(tournament) {
    this.selected = tournament;
    this.loadData()
  }

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
    if (this.stepperIndex == 0) {
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
