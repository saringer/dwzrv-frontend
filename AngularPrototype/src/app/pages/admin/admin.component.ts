import {Component, ElementRef, OnInit, ViewChild, Inject} from '@angular/core';
import {
  MatMenuTrigger, MatPaginator, MatPaginatorModule, MatSort, MatSortModule,
  MatTableDataSource
} from "@angular/material";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DogDialogComponent} from "./dialogs/dog-dialog/dog-dialog.component";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {DataSource} from "@angular/cdk/collections";
import {Http} from "@angular/http";
import {CollectionViewer} from "@angular/cdk/typings/collections";
import {DogService} from "../../services/DogService/dog.service";
import {Dogpass} from "../../data-models/dogpass";

import {Observable} from 'rxjs/Rx'
import {OwnerDialogComponent} from "./dialogs/owner-dialog/owner-dialog.component";
import {TournamentDialogComponent} from "./dialogs/tournament-dialog/tournament-dialog.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Breeder} from "../../data-models/breeder";
import {BreederDialogComponent} from "./dialogs/breeder-dialog/breeder-dialog.component";
import {ClubDialogComponent} from "./dialogs/club-dialog/club-dialog.component";
import {Club} from "../../data-models/club";
import {Dogowner} from "../../data-models/dogowner";
import {BreederService} from "../../services/BreederService/breeder.service";
import {ClubService} from "../../services/ClubService/club.service";
import {TournamentService} from "../../services/TournamentService/tournament.service";
import {OwnerService} from "../../services/OwnerService/owner.service";
import {Judge} from "../../data-models/judge";
import {JudgeService} from "../../services/JudgeService/judge.service";
import {JudgeDialogComponent} from "./dialogs/judge-dialog/judge-dialog.component";
import {TournamentDog} from "../../data-models/tournamentdog";
import {TournamentDogService} from "../../services/TournamentDogService/tournamentdog.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorBreeder') paginatorBreeder: MatPaginator;
  @ViewChild('paginatorClub') paginatorClub: MatPaginator;
  @ViewChild('paginatorOwner') paginatorOwner: MatPaginator;
  @ViewChild('paginatorTournament') paginatorTournament: MatPaginator;
  @ViewChild('paginatorJudge') paginatorJudge: MatPaginator;
  @ViewChild('paginatorTournamentDog') paginatorTournamentDog: MatPaginator;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('filterBreeder') filterBreeder: ElementRef;
  @ViewChild('filterClub') filterClub: ElementRef;
  @ViewChild('filterOwner') filterOwner: ElementRef;
  @ViewChild('filterTournament') filterTournament: ElementRef;
  @ViewChild('filterJudge') filterJudge: ElementRef;
  @ViewChild('filterTournamentDog') filterTournamentDog: ElementRef;


  displayedColumns = ['name', 'owner', 'breeder', 'action'];
  displayedColumsTournament = ['title', 'club', 'date', 'action'];
  displayedColumnsOwner = ['ownerfirstname', 'ownerlastname', 'action'];
  displayedColumnsBreeder = ['breederid', 'breederfirstname', 'breederlastname', 'kennelname', 'action'];
  displayedColumnsClub = ['clubname', 'city', 'action'];
  displayedColumnsJudge = ['judgefirstname', 'judgelastname', 'action'];
  displayedColumnsTournamentDog = ['dogname', 'coursing'];


  dataSource: UserDataSource | null;
  dataSourceTournament: TournamentDataSource | null;
  dataSourceBreeder: BreederDataSource | null;
  dataSourceOwner: OwnerDataSource | null;
  dataSourceClub: ClubDataSource | null;
  dataSourceJudge: JudgeDataSource | null;
  dataSourceTournamentDog: TournamentDogDataSource | null;


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  tournaments: Observable<Tournament[]>;
  list_all_dogs: Dogpass[] = [];
  list_participating_dogs: Dogpass[] = [];
  list_all_judges: Judge[] = [];
  list_participating_judges: Judge[] = [];
  selected: any;
  selected_awarding: any;


  ngOnInit() {
    // Load tournaments
    this.tournaments = this.tournamentService.getTournaments();
    //this.tournamentService.getTournamentsAsArray().subscribe(tournaments => this.list_all_dogs = tournaments);
    this.onLoadClick();
    //  this.loadData();


    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });


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
    this.onLoadClick();

  }

  onAllDogsDrop(e: any) {
    // Get the dropped data here


    this.list_all_dogs.push(e.dragData);
    var i = this.list_participating_dogs.findIndex(i => i.id === e.dragData.id);
    this.list_participating_dogs.splice(i, 1);
    this.tournamentService.updateTournament(this.selected);

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

  onTabSwitch() {
    //this.onLoadClick();

  }

  stepperSelectionChange(event) {
    this.tournaments = this.tournamentService.getTournaments();
    if (this.selected.participating_dogs != null) {
      this.list_participating_dogs = this.selected.participating_dogs;

    }
    else {
      this.list_participating_dogs = [];
    }
    if (this.selected.participating_judges != null) {
      this.list_participating_judges = this.selected.participating_judges;

    }
    else {
      this.list_participating_judges = [];
    }
    this.dogService.getDogsAsArray().subscribe(dogs => this.list_all_dogs = this.removeParticipatingDogs(dogs, this.list_participating_dogs));
    this.judgeService.getJudgesAsArray().subscribe(judges => this.list_all_judges = this.removeParticipatingJudges(judges, this.list_participating_judges));


    // Remove dogs from list which are already participating
    //TODO
    console.log(JSON.stringify(this.selected))


  }

  editField(field: string, editValue: string, el: any) {
    console.log(JSON.stringify(this.dataSourceTournamentDog.renderedData));

    let idx = this.dataSourceTournamentDog.renderedData.findIndex(ele => el.dogname == ele.dogname);
    this.dataSourceTournamentDog.renderedData[idx][field] = editValue;
    //console.log(this.dataSourceTournamentDog.renderedData);
    //this.selected_awarding.tournament_dog = this.dataSourceTournamentDog.renderedData;
    // this.tournamentService.updateTournament(this.selected_awarding);
    // this.tournamentDogService.addTournamentDog(new TournamentDog(e.dragData,this.selected,null, this.selected.tournamenttype,e.dragData.name));
    this.tournamentDogService.addTournamentDog(this.dataSourceTournamentDog.renderedData[idx]);
    //console.log(JSON.stringify(this.dataSourceTournamentDog.renderedData[idx]));


  }

  stepperSelectionChangeDogJudgement(event) {
    //this.tournamentDogService.getAllTournamentDogForTournament(this.selected_awarding.id);
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


  removeParticipatingDogs(first: Dogpass[], second: Dogpass[]): Dogpass[] {
    var boolean = false;
    for (var i = 0; i < first.length; i++) {
      for (var x = 0; x < second.length; x++) {
        if (first[i].id === second[x].id) {
          first.splice(i, 1);
          boolean = true;
          break;
        }
      }
    }
    return first;
  }

  removeParticipatingJudges(first: Judge[], second: Judge[]): Judge[] {
    for (var i = 0; i < first.length; i++) {
      for (var x = 0; x < second.length; x++) {
        if (first[i].id === second[x].id) {
          first.splice(i, 1);
          break;
        }
      }
    }
    return first;
  }


  constructor(public dialog: MatDialog, private http: HttpClient, private dogService: DogService,
              private breederService: BreederService, private clubService: ClubService,
              private ownerService: OwnerService, private tournamentService: TournamentService,
              private judgeService: JudgeService, private tournamentDogService: TournamentDogService,
              private _formBuilder: FormBuilder) {

  }

  onLoadClick() {
    //this.dataSource = new UserDataSource(this.dogService, this.paginator, this.sort);
    this.loadData();
    this.loadDataTournaments();
    this.loadDataBreeder();
    //this.dataSourceBreeder = new BreederDataSource(this.dogService, this.sort);
    this.loadDataOwner();
    this.loadDataClub();
    this.loadDataJudge();
    this.loadDataTournamentDog();

  }

  onCreateBreederClick(breeder: Breeder) {
    const dialogRef = this.dialog.open(BreederDialogComponent, {
      data: {breeder: breeder}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.breederService.dataChange.value.push(this.breederService.getDialogData());
        this.refreshTableBreeder();
      }
    });
  }

  onCreateDogClick(dog: Dogpass) {
    const dialogRef = this.dialog.open(DogDialogComponent, {
      data: {dog: dog}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.dogService.dataChange.value.push(this.dogService.getDialogData());
        this.refreshTableDogpass();
      }
    });
  }

  onCreateOwnerClick(dogowner: Dogowner) {
    const dialogRef = this.dialog.open(OwnerDialogComponent, {
      data: {dogowner: dogowner}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.ownerService.dataChange.value.push(this.ownerService.getDialogData());
        this.refreshTableOwner();
      }
    });
  }

  onCreateJudgeClick(judge: Judge) {
    const dialogRef = this.dialog.open(JudgeDialogComponent, {
      data: {judge: judge}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.judgeService.dataChange.value.push(this.judgeService.getDialogData());
        this.refreshTableJudge();
      }
    });
  }

  onCreateTournamentClick(tournament: Tournament) {
    const dialogRef = this.dialog.open(TournamentDialogComponent, {
      data: {tournament: tournament}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.tournamentService.dataChange.value.push(this.tournamentService.getDialogData());
        this.refreshTableTournament();
        this.tournaments = this.tournamentService.getTournaments();

      }
    });
  }

  onCreateClubClick(club: Club) {
    const dialogRef = this.dialog.open(ClubDialogComponent, {
      data: {club: club}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.clubService.dataChange.value.push(this.clubService.getDialogData());
        this.refreshTableClub();
      }
    });
  }


  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  public refreshTableDogpass() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  public refreshTableOwner() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSourceOwner._paginatorOwner.hasNextPage()) {
      this.dataSourceOwner._paginatorOwner.nextPage();
      this.dataSourceOwner._paginatorOwner.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSourceOwner._paginatorOwner.hasPreviousPage()) {
      this.dataSourceOwner._paginatorOwner.previousPage();
      this.dataSourceOwner._paginatorOwner.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSourceOwner.filter = '';
      this.dataSourceOwner.filter = this.filterOwner.nativeElement.value;
    }
  }

  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  public refreshTableTournamentDog() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSourceTournamentDog._paginatorTournamentDog.hasNextPage()) {
      this.dataSourceTournamentDog._paginatorTournamentDog.nextPage();
      this.dataSourceTournamentDog._paginatorTournamentDog.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSourceTournamentDog._paginatorTournamentDog.hasPreviousPage()) {
      this.dataSourceTournamentDog._paginatorTournamentDog.previousPage();
      this.dataSourceTournamentDog._paginatorTournamentDog.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSourceTournamentDog.filter = '';
      this.dataSourceTournamentDog.filter = this.filterTournamentDog.nativeElement.value;
    }
  }

  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  public refreshTableJudge() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSourceJudge._paginatorJudge.hasNextPage()) {
      this.dataSourceJudge._paginatorJudge.nextPage();
      this.dataSourceJudge._paginatorJudge.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSourceJudge._paginatorJudge.hasPreviousPage()) {
      this.dataSourceJudge._paginatorJudge.previousPage();
      this.dataSourceJudge._paginatorJudge.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSourceJudge.filter = '';
      this.dataSourceJudge.filter = this.filterJudge.nativeElement.value;
    }
  }

  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  public refreshTableClub() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSourceClub._paginatorClub.hasNextPage()) {
      this.dataSourceClub._paginatorClub.nextPage();
      this.dataSourceClub._paginatorClub.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSourceClub._paginatorClub.hasPreviousPage()) {
      this.dataSourceClub._paginatorClub.previousPage();
      this.dataSourceClub._paginatorClub.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSourceClub.filter = '';
      this.dataSourceClub.filter = this.filterClub.nativeElement.value;
    }
  }

  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  public refreshTableBreeder() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSourceBreeder._paginatorBreeder.hasNextPage()) {
      this.dataSourceBreeder._paginatorBreeder.nextPage();
      this.dataSourceBreeder._paginatorBreeder.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSourceBreeder._paginatorBreeder.hasPreviousPage()) {
      this.dataSourceBreeder._paginatorBreeder.previousPage();
      this.dataSourceBreeder._paginatorBreeder.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSourceBreeder.filter = '';
      this.dataSourceBreeder.filter = this.filterBreeder.nativeElement.value;
    }
  }

  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  public refreshTableTournament() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSourceTournament._paginatorTournament.hasNextPage()) {
      this.dataSourceTournament._paginatorTournament.nextPage();
      this.dataSourceTournament._paginatorTournament.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSourceTournament._paginatorTournament.hasPreviousPage()) {
      this.dataSourceTournament._paginatorTournament.previousPage();
      this.dataSourceTournament._paginatorTournament.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSourceTournament.filter = '';
      this.dataSourceTournament.filter = this.filterTournament.nativeElement.value;
    }
  }


  public loadData() {
    this.dataSource = new UserDataSource(this.dogService, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  public loadDataBreeder() {
    this.dataSourceBreeder = new BreederDataSource(this.breederService, this.paginatorBreeder, this.sort);
    Observable.fromEvent(this.filterBreeder.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSourceBreeder) {
          return;
        }
        this.dataSourceBreeder.filter = this.filterBreeder.nativeElement.value;
      });
  }

  public loadDataTournamentDog() {
    this.dataSourceTournamentDog = new TournamentDogDataSource(this.tournamentDogService, this.paginatorTournamentDog, this.sort);
    Observable.fromEvent(this.filterTournamentDog.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSourceTournamentDog) {
          return;
        }
        this.dataSourceTournamentDog.filter = this.filterTournamentDog.nativeElement.value;
      });
  }

  public loadDataTournaments() {
    this.dataSourceTournament = new TournamentDataSource(this.tournamentService, this.paginatorTournament, this.sort);
    Observable.fromEvent(this.filterTournament.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSourceTournament) {
          return;
        }
        this.dataSourceTournament.filter = this.filterTournament.nativeElement.value;
      });
  }

  public loadDataClub() {
    this.dataSourceClub = new ClubDataSource(this.clubService, this.paginatorClub, this.sort);
    Observable.fromEvent(this.filterClub.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSourceClub) {
          return;
        }
        this.dataSourceClub.filter = this.filterClub.nativeElement.value;
      });
  }

  public loadDataOwner() {
    this.dataSourceOwner = new OwnerDataSource(this.ownerService, this.paginatorOwner, this.sort);
    Observable.fromEvent(this.filterOwner.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSourceOwner) {
          return;
        }
        this.dataSourceOwner.filter = this.filterOwner.nativeElement.value;
      });
  }

  public loadDataJudge() {
    this.dataSourceJudge = new JudgeDataSource(this.judgeService, this.paginatorJudge, this.sort);
    Observable.fromEvent(this.filterJudge.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSourceJudge) {
          return;
        }
        this.dataSourceJudge.filter = this.filterJudge.nativeElement.value;
      });
  }


}

export class TournamentDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filterTournament: string) {
    this._filterChange.next(filterTournament);
  }

  filteredData: Tournament[] = [];
  renderedData: Tournament[] = [];

  constructor(private tournamentService: TournamentService,
              public _paginatorTournament: MatPaginator,
              private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginatorTournament.pageIndex = 0);

  }

  connect(): Observable<Tournament[]> {
    const displayDataChanges = [
      this.tournamentService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginatorTournament.page
    ];

    this.tournamentService.getAllTournaments();
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.tournamentService.data.slice().filter((tournament: Tournament) => {
        const searchStr = (tournament.title + tournament.date).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());


      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginatorTournament.pageIndex * this._paginatorTournament.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginatorTournament.pageSize);
      return this.renderedData;

    });
  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Tournament[]): Tournament[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.title, b.title];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

export class ClubDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filterClub: string) {
    this._filterChange.next(filterClub);
  }

  filteredData: Club[] = [];
  renderedData: Club[] = [];

  constructor(private clubService: ClubService,
              public _paginatorClub: MatPaginator,
              private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginatorClub.pageIndex = 0);

  }

  connect(): Observable<Club[]> {
    const displayDataChanges = [
      this.clubService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginatorClub.page
    ];

    this.clubService.getAllClubs();
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.clubService.data.slice().filter((club: Club) => {
        const searchStr = (club.city + club.clubname + club.country + club.postalcode + club.street).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());


      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginatorClub.pageIndex * this._paginatorClub.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginatorClub.pageSize);
      return this.renderedData;

    });
  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Club[]): Club[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.clubname, b.clubname];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}

export class OwnerDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filterOwner: string) {
    this._filterChange.next(filterOwner);
  }

  filteredData: Dogowner[] = [];
  renderedData: Dogowner[] = [];

  constructor(private ownerService: OwnerService,
              public _paginatorOwner: MatPaginator,
              private _sort: MatSort) {
    super()
    this._filterChange.subscribe(() => this._paginatorOwner.pageIndex = 0);

  }

  connect(): Observable<Dogowner[]> {
    const displayDataChanges = [
      this.ownerService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginatorOwner.page
    ];

    this.ownerService.getAllOwners();
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.ownerService.data.slice().filter((dogowner: Dogowner) => {
        const searchStr = (dogowner.firstname + dogowner.lastname).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());


      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginatorOwner.pageIndex * this._paginatorOwner.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginatorOwner.pageSize);
      return this.renderedData;

    });
  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Dogowner[]): Dogowner[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.firstname, b.firstname];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

export class BreederDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filterBreeder: string) {
    this._filterChange.next(filterBreeder);
  }

  filteredData: Breeder[] = [];
  renderedData: Breeder[] = [];

  constructor(private breederService: BreederService,
              public _paginatorBreeder: MatPaginator,
              private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginatorBreeder.pageIndex = 0);

  }

  connect(): Observable<Breeder[]> {
    // return this.dogService.getDogs();
    const displayDataChanges = [
      this.breederService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginatorBreeder.page
    ];

    this.breederService.getAllBreeder();
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.breederService.data.slice().filter((breeder: Breeder) => {
        const searchStr = (breeder.firstname + breeder.lastname).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());


      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginatorBreeder.pageIndex * this._paginatorBreeder.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginatorBreeder.pageSize);
      return this.renderedData;

    });

  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Breeder[]): Breeder[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.firstname, b.firstname];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }


}

export class TournamentDogDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filterTournamentDog: string) {
    this._filterChange.next(filterTournamentDog);
  }

  filteredData: TournamentDog[] = [];
  renderedData: TournamentDog[] = [];

  constructor(private tournamentDogService: TournamentDogService,
              public _paginatorTournamentDog: MatPaginator,
              private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginatorTournamentDog.pageIndex = 0);

  }

  connect(): Observable<TournamentDog[]> {
    // return this.dogService.getDogs();
    const displayDataChanges = [
      this.tournamentDogService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginatorTournamentDog.page
    ];

    this.tournamentDogService.getAllTournamentDog();
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.tournamentDogService.data.slice().filter((tournamentDog: TournamentDog) => {
        const searchStr = (tournamentDog.dogname + tournamentDog.coursingrating1).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());


      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginatorTournamentDog.pageIndex * this._paginatorTournamentDog.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginatorTournamentDog.pageSize);
      return this.renderedData;

    });

  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: TournamentDog[]): TournamentDog[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.dogname, b.dogname];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }


}

export class JudgeDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filterJudge: string) {
    this._filterChange.next(filterJudge);
  }

  filteredData: Judge[] = [];
  renderedData: Judge[] = [];

  constructor(private judgeService: JudgeService,
              public _paginatorJudge: MatPaginator,
              private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginatorJudge.pageIndex = 0);

  }

  connect(): Observable<Judge[]> {
    // return this.dogService.getDogs();
    const displayDataChanges = [
      this.judgeService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginatorJudge.page
    ];

    this.judgeService.getAllJudges();
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.judgeService.data.slice().filter((judge: Judge) => {
        const searchStr = (judge.firstname + judge.lastname).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());


      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginatorJudge.pageIndex * this._paginatorJudge.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginatorJudge.pageSize);
      return this.renderedData;

    });

  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Judge[]): Judge[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.firstname, b.firstname];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }


}


export class UserDataSource extends DataSource<any> {

  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Dogpass[] = [];
  renderedData: Dogpass[] = [];

  constructor(private dogService: DogService,
              public _paginator: MatPaginator,
              private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<Dogpass[]> {
    // return this.dogService.getDogs();
    const displayDataChanges = [
      this.dogService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this.dogService.getAllDogs();
    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.dogService.data.slice().filter((dog: Dogpass) => {
        const searchStr = (dog.name + dog.owner.firstname + dog.owner.lastname + dog.breeder.firstname + dog.breeder.lastname).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;

    });

  }


  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Dogpass[]): Dogpass[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

export interface Tournament {
  id: number;
  title: string;
  date: Date;
}




