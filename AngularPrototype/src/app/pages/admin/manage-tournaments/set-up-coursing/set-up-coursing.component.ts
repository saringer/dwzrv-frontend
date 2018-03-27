import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Tournament} from "../../../../data-models/tournament";
import {Dogpass} from "../../../../data-models/dogpass";
import {Coursing} from "../../../../data-models/coursing";
import {TournamentDogService} from "../../../../services/TournamentDogService/tournamentdog.service";
import {DogService} from "../../../../services/DogService/dog.service";
import {JudgeService} from "../../../../services/JudgeService/judge.service";
import {FormBuilder} from "@angular/forms";
import {TournamentService} from "../../../../services/TournamentService/tournament.service";
import {SearchService} from "../../../../services/SearchService/search.service";

@Component({
  selector: 'app-set-up-coursing',
  templateUrl: './set-up-coursing.component.html',
  styleUrls: ['./set-up-coursing.component.css']
})
export class SetUpCoursingComponent implements OnInit, OnChanges {
  list_all_dogs: Dogpass[] = [];
  list_national_class: Dogpass[] = [];
  list_international_class: Dogpass[] = [];
  dragcontainer: string;
  filterDog = {name: ''};


  @Input() selectedTournament: any;
  @Input() currentStepperIndex: number;

  constructor(private searchService: SearchService, private tournamentService: TournamentService, private tournamentDogService: TournamentDogService,
              private dogService: DogService) {
    this.searchService.currentMessage.subscribe(message => this.filterDog.name = message)
  }

  ngOnInit() {
  }

  // Check if the selected tournament or MatStepper index passed via @Input() is changed
  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentStepperIndex == 2) {
      this.tournamentService.getTournamentById(this.selectedTournament.id).subscribe(tournament => this.selectedTournament = tournament);
      this.loadData();
    }

  }

  dragStart(container: string) {
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
        this.tournamentDogService.addTournamentDog(new Coursing(e.dragData, this.selectedTournament, e.dragData.name, 'international'));
      }

      // Add object to the international class container and remove it from national container
      if (this.dragcontainer === 'national') {
        this.list_international_class.push(e.dragData);

        var i = this.list_national_class.findIndex(i => i.id === e.dragData.id);
        this.list_national_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.tournamentDogService.addTournamentDog(new Coursing(e.dragData, this.selectedTournament, e.dragData.name, 'international'));
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
        this.tournamentDogService.addTournamentDog(new Coursing(e.dragData, this.selectedTournament, e.dragData.name, 'national'));
      }

      // Add object to the national class container and remove it from international container
      if (this.dragcontainer === 'international') {
        this.list_national_class.push(e.dragData);

        var i = this.list_international_class.findIndex(i => i.id === e.dragData.id);
        this.list_international_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.tournamentDogService.addTournamentDog(new Coursing(e.dragData, this.selectedTournament, e.dragData.name, 'national'));
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
        this.tournamentDogService.deleteItem(e.dragData.id, this.selectedTournament.id);
      }

      if (this.dragcontainer === 'national') {
        this.list_all_dogs.push(e.dragData);
        var i = this.list_national_class.findIndex(i => i.id === e.dragData.id);
        this.list_national_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.tournamentDogService.deleteItem(e.dragData.id, this.selectedTournament.id);
      }


    }
  }

  loadData() {


    this.list_all_dogs = [];
    this.list_international_class = [];
    this.list_national_class = [];
    for (var i = 0; i < this.selectedTournament.coursings.length; i++) {
      // If dog object of the json-array is is represented by its id only we fetch the object from the db
      if (this.isNumber(this.selectedTournament.coursings[i].dog)) {
        if (this.selectedTournament.coursings[i].coursingClass === 'international') {
          this.dogService.getDogById(this.selectedTournament.coursings[i].dog).subscribe(dog => this.list_international_class.push(dog));
        }
        if (this.selectedTournament.coursings[i].coursingClass === 'national') {
          this.dogService.getDogById(this.selectedTournament.coursings[i].dog).subscribe(dog => this.list_national_class.push(dog));
        }
      }
      else {
        if (this.selectedTournament.coursings[i].coursingClass === 'international') {
          this.list_international_class.push(this.selectedTournament.coursings[i].dog)
        }
        if (this.selectedTournament.coursings[i].coursingClass === 'national') {
          this.list_national_class.push(this.selectedTournament.coursings[i].dog)
        }


      }
    }
    // Load available dogs
    this.dogService.getDogsAsArray().subscribe(dogs => this.list_all_dogs = dogs.filter(dog => this.customFilterDog(dog, this.list_international_class, this.list_national_class)));


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


}
