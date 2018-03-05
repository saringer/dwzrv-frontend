import {Component, OnInit} from '@angular/core';
import {Tournament} from "../../../data-models/tournament";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Judge} from "../../../data-models/judge";
import {Dogpass} from "../../../data-models/dogpass";
import {Observable} from "rxjs/Rx";
import {TournamentDog} from "../../../data-models/tournamentdog";
import {TournamentService} from "../../../services/TournamentService/tournament.service";
import {TournamentDogService} from "../../../services/TournamentDogService/tournamentdog.service";
import {DogService} from "../../../services/DogService/dog.service";
import {JudgeService} from "../../../services/JudgeService/judge.service";

@Component({
  selector: 'app-manage-tournaments',
  templateUrl: './manage-tournaments.component.html',
  styleUrls: ['./manage-tournaments.component.css']
})
export class ManageTournamentsComponent implements OnInit {

  dataInitialized: boolean = false;

  firstFormGroup: FormGroup;
  tournaments: Observable<Tournament[]>;
  list_all_dogs: Dogpass[] = [];
  list_participating_dogs: Dogpass[] = [];
  list_all_judges: Judge[] = [];
  list_participating_judges: Judge[] = [];
  selected: any;

  constructor(private tournamentService: TournamentService, private tournamentDogService: TournamentDogService, private _formBuilder: FormBuilder,
              private dogService: DogService, private judgeService: JudgeService) {
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
    // Validators.email,
  ]);

  onParticipatingDogsDrop(e: any) {
    // Get the dropped data here


    this.list_participating_dogs.push(e.dragData);
    var i = this.list_all_dogs.findIndex(i => i.id === e.dragData.id);
    this.list_all_dogs.splice(i, 1);
    this.selected.participating_dogs = this.list_participating_dogs;
    console.log('Hund: ' + this.selected.participating_dogs[0].name);
    //this.tournamentService.updateTournament(this.selected);
    this.tournamentDogService.addTournamentDog(new TournamentDog(e.dragData, this.selected, this.selected.tournamenttype, e.dragData.name));

  }

  onAllDogsDrop(e: any) {
    // Get the dropped data here


    this.list_all_dogs.push(e.dragData);
    var i = this.list_participating_dogs.findIndex(i => i.id === e.dragData.id);
    this.list_participating_dogs.splice(i, 1);
    //this.tournamentService.updateTournament(this.selected);
    this.tournamentDogService.deleteItem(e.dragData.id, this.selected.id);
  }

  onParticipatingJudgesDrop(e: any) {
    // Get the dropped data here


    this.list_participating_judges.push(e.dragData);
    var i = this.list_all_judges.findIndex(i => i.id === e.dragData.id);
    this.list_all_judges.splice(i, 1);
    this.selected.participating_judges = this.list_participating_judges;
    this.tournamentService.updateTournament(this.selected);


  }

  onAllJudgesDrop(e: any) {
    // Get the dropped data here


    this.list_all_judges.push(e.dragData);
    var i = this.list_participating_judges.findIndex(i => i.id === e.dragData.id);
    this.list_participating_judges.splice(i, 1);
    this.tournamentService.updateTournament(this.selected);

  }

  stepperSelectionChange(event) {
    // Load already selected dogs and judges
    this.tournamentService.getTournamentById(this.selected.id).subscribe(tournament => this.selected = tournament);
   this.loadData()
   // this.tournaments = this.tournamentService.getTournaments();


  }

  loadData() {
    //if (this.selected != null && !this.dataInitialized) {
     // this.selected = this.tournamentService.getTournament(this.selected.id)

      this.list_all_dogs = [];
      this.list_participating_dogs = [];
      for (var i = 0; i < this.selected.tournamentDogs.length; i++) {
        if (this.isNumber(this.selected.tournamentDogs[i].dog)) {
           this.dogService.getDogById(this.selected.tournamentDogs[i].dog).subscribe(dog => this.list_participating_dogs.push(dog));
        }
        else {
          this.list_participating_dogs.push(this.selected.tournamentDogs[i].dog)
        }
      }
      this.list_participating_judges = this.selected.participating_judges;
      // Load available dogs and judges
      this.dogService.getDogsAsArray().subscribe(dogs => this.list_all_dogs = dogs.filter(dog => this.customFilterDog(dog, this.list_participating_dogs)));
      //this.dogService.getDogsAsArray().subscribe(dogs => this.list_all_dogs = this.removeParticipatingDogs(dogs, this.list_participating_dogs));
      this.judgeService.getJudgesAsArray().subscribe(judges => this.list_all_judges = judges.filter(judge => this.customFilterJudge(judge, this.list_participating_judges)));

     // this.dataInitialized = true;
     // console.log(this.dataInitialized)
    //}
  }

  customFilterDog(element: Dogpass, array: Dogpass[]): boolean {
    var result = true;
    for (var i = 0; i < array.length; i++) {
      if (element.id === array[i].id) {
        //console.log('element' + element.id)
        //console.log('array' + array[i].id)

        result = false;
        break;
      }
    }
    return result;
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

  isNumber(val): boolean { return typeof val === 'number'; }


}
