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
import {Dogowner} from "../../../data-models/dogowner";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

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
  list_national_class: Dogpass[] = [];
  list_international_class: Dogpass[] = [];

  list_all_judges: Judge[] = [];
  list_participating_judges: Judge[] = [];
  selected: any;
  dragcontainer: string;

  constructor(private searchService: SearchService, private tournamentService: TournamentService, private tournamentDogService: TournamentDogService, private _formBuilder: FormBuilder,
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

  dragStart(container: string) {
    console.log(container);
    this.dragcontainer = container;
  }

  onInternationalClassDrop(e: any) {
    // Get the dropped data here
    if (!this.dogIsAlreadyInList(e.dragData.id, this.list_international_class)) {

      // Add object to the international class container and remove it from all_dogs container
      if (this.dragcontainer === 'alldogs') {
        this.list_international_class.push(e.dragData);

        var i = this.list_all_dogs.findIndex(i => i.id === e.dragData.id);
        this.list_all_dogs.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.tournamentDogService.addTournamentDog(new Coursing(e.dragData, this.selected, e.dragData.name, 'international'));
      }

      // Add object to the international class container and remove it from national container
      if (this.dragcontainer === 'national') {
        this.list_international_class.push(e.dragData);

        var i = this.list_national_class.findIndex(i => i.id === e.dragData.id);
        this.list_national_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.tournamentDogService.addTournamentDog(new Coursing(e.dragData, this.selected,  e.dragData.name, 'international'));
      }

    }
  }

  onNationalClassDrop(e: any) {
    // Get the dropped data here
    if (!this.dogIsAlreadyInList(e.dragData.id, this.list_national_class)) {

      // Add object to the national class container and remove it from all_dogs container
      if (this.dragcontainer === 'alldogs') {
        this.list_national_class.push(e.dragData);

        var i = this.list_all_dogs.findIndex(i => i.id === e.dragData.id);
        this.list_all_dogs.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.tournamentDogService.addTournamentDog(new Coursing(e.dragData, this.selected, e.dragData.name, 'national'));
      }

      // Add object to the national class container and remove it from international container
      if (this.dragcontainer === 'international') {
        this.list_national_class.push(e.dragData);

        var i = this.list_international_class.findIndex(i => i.id === e.dragData.id);
        this.list_international_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.tournamentDogService.addTournamentDog(new Coursing(e.dragData, this.selected, e.dragData.name, 'national'));
      }

    }
  }

  onAllDogsDrop(e: any) {
    // Get the dropped data here
    if (!this.dogIsAlreadyInList(e.dragData.id, this.list_all_dogs)) {

      if (this.dragcontainer === 'international') {
        this.list_all_dogs.push(e.dragData);
        var i = this.list_international_class.findIndex(i => i.id === e.dragData.id);
        this.list_international_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.tournamentDogService.deleteItem(e.dragData.id, this.selected.id);
      }

      if (this.dragcontainer === 'national') {
        this.list_all_dogs.push(e.dragData);
        var i = this.list_national_class.findIndex(i => i.id === e.dragData.id);
        this.list_national_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.tournamentDogService.deleteItem(e.dragData.id, this.selected.id);
      }


    }
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
    // Load already selected dogs and judges
    this.tournamentService.getTournamentById(this.selected.id).subscribe(tournament => this.selected = tournament);
    this.loadData()
    // this.tournaments = this.tournamentService.getTournaments();


  }

  loadData() {


    this.list_all_dogs = [];
    this.list_international_class = [];
    this.list_national_class = [];
    for (var i = 0; i < this.selected.coursings.length; i++) {
      // If dog object of the json-array is is represented by its id only we fetch the object from the db
      if (this.isNumber(this.selected.coursings[i].dog)) {
        if (this.selected.coursings[i].coursingClass === 'international') {
          this.dogService.getDogById(this.selected.coursings[i].dog).subscribe(dog => this.list_international_class.push(dog));
        }
        if (this.selected.coursings[i].coursingClass === 'national') {
          this.dogService.getDogById(this.selected.coursings[i].dog).subscribe(dog => this.list_national_class.push(dog));
        }
      }
      else {
        if (this.selected.coursings[i].coursingClass === 'international') {
          this.list_international_class.push(this.selected.coursings[i].dog)
        }
        if (this.selected.coursings[i].coursingClass === 'national') {
          this.list_national_class.push(this.selected.coursings[i].dog)
        }


      }
    }
    this.list_participating_judges = this.selected.participating_judges;
    // Load available dogs and judges
    this.dogService.getDogsAsArray().subscribe(dogs => this.list_all_dogs = dogs.filter(dog => this.customFilterDog(dog, this.list_international_class, this.list_national_class)));
    this.judgeService.getJudgesAsArray().subscribe(judges => this.list_all_judges = judges.filter(judge => this.customFilterJudge(judge, this.list_participating_judges)));


  }


  customFilterDog(element: Dogpass, international_class: Dogpass[], national_class: Dogpass[]): boolean {
    var result = true;
    for (var i = 0; i < international_class.length; i++) {
      if (element.id === international_class[i].id) {
        result = false;
        break;
      }
    }
    for (var i = 0; i < national_class.length; i++) {
      if (element.id === national_class[i].id) {
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

  isNumber(val): boolean {
    return typeof val === 'number';
  }

  dogIsAlreadyInList(dogid: number, dogs: Dogpass[]): boolean {
    var result: boolean = false;
    for (var i = 0; i < dogs.length; i++) {
      if (dogid === dogs[i].id) {
        result = true;
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


