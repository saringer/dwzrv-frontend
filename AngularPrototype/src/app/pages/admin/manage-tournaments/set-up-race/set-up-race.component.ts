import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TournamentService} from "../../../../services/TournamentService/tournament.service";
import {DogService} from "../../../../services/DogService/dog.service";
import {Coursing} from "../../../../data-models/coursing";
import {SearchService} from "../../../../services/SearchService/search.service";
import {TournamentDogService} from "../../../../services/TournamentDogService/tournamentdog.service";
import {Dogpass} from "../../../../data-models/dogpass";
import {Race} from "../../../../data-models/race";
import {RaceService} from "../../../../services/TournamentDogService/RaceService";

@Component({
  selector: 'app-set-up-race',
  templateUrl: './set-up-race.component.html',
  styleUrls: ['./set-up-race.component.css']
})
export class SetUpRaceComponent implements OnInit, OnChanges {

  list_all_dogs: Dogpass[] = [];
  list_a_class: Dogpass[] = [];
  list_elementary_class: Dogpass[] = [];
  list_national_class: Dogpass[] = [];
  list_senior_class: Dogpass[] = [];
  dragcontainer: string;
  filterDog = {name: ''};
  distances: string[] = ['280 m', '365 m'];
  selectedDistanceA: string = '280 m';
  selectedDistanceNational: string = '280 m';
  selectedDistanceElementary: string = '280 m';
  selectedDistanceSenior: string = '280 m';


  @Input() selectedTournament: any;
  @Input() currentStepperIndex: number;

  constructor(private searchService: SearchService, private tournamentService: TournamentService, private raceService: RaceService,
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


  onAClassDrop(e: any) {
    // Get the dropped data here
    if (!this.dogIsAlreadyInList(e.dragData.id, this.list_a_class)) {

      // Add object to the international class container and remove it from all_dogs container
      if (this.dragcontainer === 'alldogs') {
        this.list_a_class.push(e.dragData);

        var i = this.list_all_dogs.findIndex(i => i.id === e.dragData.id);
        this.list_all_dogs.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.addTournamentDogRace(new Race(e.dragData, this.selectedTournament, 'a', this.selectedDistanceA));
      }

      // Add object to the international class container and remove it from national container
      if (this.dragcontainer === 'national') {
        this.list_a_class.push(e.dragData);

        var i = this.list_national_class.findIndex(i => i.id === e.dragData.id);
        this.list_national_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.addTournamentDogRace(new Race(e.dragData, this.selectedTournament, 'a', this.selectedDistanceA));
      }
      if (this.dragcontainer === 'elementary') {
        this.list_a_class.push(e.dragData);

        var i = this.list_elementary_class.findIndex(i => i.id === e.dragData.id);
        this.list_elementary_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.addTournamentDogRace(new Race(e.dragData, this.selectedTournament, 'a', this.selectedDistanceA));
      }
      if (this.dragcontainer === 'senior') {
        this.list_a_class.push(e.dragData);

        var i = this.list_senior_class.findIndex(i => i.id === e.dragData.id);
        this.list_senior_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.addTournamentDogRace(new Race(e.dragData, this.selectedTournament, 'a', this.selectedDistanceA));
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
        this.raceService.addTournamentDogRace(new Race(e.dragData, this.selectedTournament, 'national', this.selectedDistanceNational));
      }
      // Add object to the national class container and remove it from international container
      if (this.dragcontainer === 'a') {
        this.list_national_class.push(e.dragData);

        var i = this.list_a_class.findIndex(i => i.id === e.dragData.id);
        this.list_a_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.addTournamentDogRace(new Race(e.dragData, this.selectedTournament, 'national', this.selectedDistanceNational));
      }
      if (this.dragcontainer === 'elementary') {
        this.list_national_class.push(e.dragData);

        var i = this.list_elementary_class.findIndex(i => i.id === e.dragData.id);
        this.list_elementary_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.addTournamentDogRace(new Race(e.dragData, this.selectedTournament, 'national', this.selectedDistanceNational));
      }
      if (this.dragcontainer === 'senior') {
        this.list_national_class.push(e.dragData);

        var i = this.list_senior_class.findIndex(i => i.id === e.dragData.id);
        this.list_senior_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.addTournamentDogRace(new Race(e.dragData, this.selectedTournament, 'national', this.selectedDistanceNational));
      }

    }
  }

  onElementaryClassDrop(e: any) {
    // Get the dropped data here
    if (!this.dogIsAlreadyInList(e.dragData.id, this.list_elementary_class)) {

      // Add object to the international class container and remove it from all_dogs container
      if (this.dragcontainer === 'alldogs') {
        this.list_elementary_class.push(e.dragData);

        var i = this.list_all_dogs.findIndex(i => i.id === e.dragData.id);
        this.list_all_dogs.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.addTournamentDogRace(new Race(e.dragData, this.selectedTournament, 'elementary', this.selectedDistanceElementary));
      }

      // Add object to the international class container and remove it from national container
      if (this.dragcontainer === 'national') {
        this.list_elementary_class.push(e.dragData);

        var i = this.list_national_class.findIndex(i => i.id === e.dragData.id);
        this.list_national_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.addTournamentDogRace(new Race(e.dragData, this.selectedTournament, 'elementary', this.selectedDistanceElementary));
      }
      if (this.dragcontainer === 'a') {
        this.list_elementary_class.push(e.dragData);

        var i = this.list_a_class.findIndex(i => i.id === e.dragData.id);
        this.list_a_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.addTournamentDogRace(new Race(e.dragData, this.selectedTournament, 'elementary', this.selectedDistanceElementary));
      }
      if (this.dragcontainer === 'senior') {
        this.list_elementary_class.push(e.dragData);

        var i = this.list_senior_class.findIndex(i => i.id === e.dragData.id);
        this.list_senior_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.addTournamentDogRace(new Race(e.dragData, this.selectedTournament, 'elementary', this.selectedDistanceElementary));
      }

    }
  }

  onSeniorClassDrop(e: any) {
    // Get the dropped data here
    if (!this.dogIsAlreadyInList(e.dragData.id, this.list_senior_class)) {

      // Add object to the international class container and remove it from all_dogs container
      if (this.dragcontainer === 'alldogs') {
        this.list_senior_class.push(e.dragData);

        var i = this.list_all_dogs.findIndex(i => i.id === e.dragData.id);
        this.list_all_dogs.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.addTournamentDogRace(new Race(e.dragData, this.selectedTournament, 'senior', this.selectedDistanceSenior));
      }

      // Add object to the international class container and remove it from national container
      if (this.dragcontainer === 'national') {
        this.list_senior_class.push(e.dragData);

        var i = this.list_national_class.findIndex(i => i.id === e.dragData.id);
        this.list_national_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.addTournamentDogRace(new Race(e.dragData, this.selectedTournament, 'senior', this.selectedDistanceSenior));
      }
      if (this.dragcontainer === 'a') {
        this.list_senior_class.push(e.dragData);

        var i = this.list_a_class.findIndex(i => i.id === e.dragData.id);
        this.list_a_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.addTournamentDogRace(new Race(e.dragData, this.selectedTournament, 'senior', this.selectedDistanceSenior));
      }
      if (this.dragcontainer === 'elementary') {
        this.list_senior_class.push(e.dragData);

        var i = this.list_elementary_class.findIndex(i => i.id === e.dragData.id);
        this.list_elementary_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.addTournamentDogRace(new Race(e.dragData, this.selectedTournament, 'senior', this.selectedDistanceSenior));
      }

    }
  }

  onAllDogsDrop(e: any) {
    // Get the dropped data here
    if (!this.dogIsAlreadyInList(e.dragData.id, this.list_all_dogs)) {

      if (this.dragcontainer === 'a') {
        this.list_all_dogs.push(e.dragData);
        var i = this.list_a_class.findIndex(i => i.id === e.dragData.id);
        this.list_a_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.deleteRace(e.dragData.id, this.selectedTournament.id);
      }
      if (this.dragcontainer === 'national') {
        this.list_all_dogs.push(e.dragData);
        var i = this.list_national_class.findIndex(i => i.id === e.dragData.id);
        this.list_national_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.deleteRace(e.dragData.id, this.selectedTournament.id);
      }
      if (this.dragcontainer === 'elementary') {
        this.list_all_dogs.push(e.dragData);
        var i = this.list_elementary_class.findIndex(i => i.id === e.dragData.id);
        this.list_elementary_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.deleteRace(e.dragData.id, this.selectedTournament.id);
      }
      if (this.dragcontainer === 'senior') {
        this.list_all_dogs.push(e.dragData);
        var i = this.list_senior_class.findIndex(i => i.id === e.dragData.id);
        this.list_senior_class.splice(i, 1);
        //this.tournamentService.updateTournament(this.selected);
        this.raceService.deleteRace(e.dragData.id, this.selectedTournament.id);
      }
    }
  }

  loadData() {


    this.list_all_dogs = [];
    this.list_a_class = [];
    this.list_national_class = [];
    this.list_elementary_class = [];
    this.list_senior_class = [];

    for (var i = 0; i < this.selectedTournament.races.length; i++) {
      // If dog object of the json-array is is represented by its id only we fetch the object from the db
      if (this.isNumber(this.selectedTournament.races[i].dog)) {
        if (this.selectedTournament.races[i].raceClass === 'a') {
          this.selectedDistanceA = this.selectedTournament.races[i].distance;
          this.dogService.getDogById(this.selectedTournament.races[i].dog).subscribe(dog => this.list_a_class.push(dog));
        }
        if (this.selectedTournament.races[i].raceClass === 'national') {
          this.selectedDistanceNational = this.selectedTournament.races[i].distance;
          this.dogService.getDogById(this.selectedTournament.races[i].dog).subscribe(dog => this.list_national_class.push(dog));
        }
        if (this.selectedTournament.races[i].raceClass === 'elementary') {
          this.selectedDistanceElementary = this.selectedTournament.races[i].distance;
          this.dogService.getDogById(this.selectedTournament.races[i].dog).subscribe(dog => this.list_elementary_class.push(dog));
        }
        if (this.selectedTournament.races[i].raceClass === 'senior') {
          this.selectedDistanceSenior = this.selectedTournament.races[i].distance;
          this.dogService.getDogById(this.selectedTournament.races[i].dog).subscribe(dog => this.list_senior_class.push(dog));
        }
      }
      else {
        if (this.selectedTournament.races[i].raceClass === 'a') {
          this.selectedDistanceA = this.selectedTournament.races[i].distance;
          this.list_a_class.push(this.selectedTournament.races[i].dog)
        }
        if (this.selectedTournament.races[i].raceClass === 'national') {
          this.selectedDistanceNational = this.selectedTournament.races[i].distance;
          this.list_national_class.push(this.selectedTournament.races[i].dog)
        }
        if (this.selectedTournament.races[i].raceClass === 'elementary') {
          this.selectedDistanceElementary = this.selectedTournament.races[i].distance;
          this.list_elementary_class.push(this.selectedTournament.races[i].dog)
        }
        if (this.selectedTournament.races[i].raceClass === 'senior') {
          this.selectedDistanceSenior = this.selectedTournament.races[i].distance;
          this.list_senior_class.push(this.selectedTournament.races[i].dog)
        }
      }
    }
    // Load available dogs
    this.dogService.getDogsAsArray().subscribe(dogs => this.list_all_dogs = dogs.filter(dog => this.customFilterDog(dog, this.list_a_class,
      this.list_national_class, this.list_elementary_class, this.list_senior_class)));


  }

  customFilterDog(element: Dogpass, a_class: Dogpass[], national_class: Dogpass[],
                  elementary_class: Dogpass[], senior_class: Dogpass[]): boolean {
    var result = true;

    for (var i = 0; i < a_class.length; i++) {
      if (element.id === a_class[i].id) {
        result = false;
        break;
      }
    }

    if (result) {
      for (var i = 0; i < national_class.length; i++) {
        if (element.id === national_class[i].id) {
          result = false;
          break;
        }
      }
      if (result) {
        for (var i = 0; i < elementary_class.length; i++) {
          if (element.id === elementary_class[i].id) {
            result = false;
            break;
          }
        }
        if (result) {
          for (var i = 0; i < senior_class.length; i++) {
            if (element.id === senior_class[i].id) {
              result = false;
              break;
            }
          }
        }
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

  formatDogAndKennel(dog: Dogpass): string {
    if (dog.breeder != null) {
      if (dog.breeder.affix == 'prefix') {
        return dog.breeder.kennelname + ' ' + dog.name
      }
      else {
        return dog.name + ' ' + dog.breeder.kennelname

      }
    }
    else {
      return dog.name;
    }
  }

}
