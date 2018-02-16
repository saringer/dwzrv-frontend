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

import {CompetitionService} from "../../forms/dog-form/shared.services";
import {DataSource} from "@angular/cdk/collections";
import {Http} from "@angular/http";
import {CollectionViewer} from "@angular/cdk/typings/collections";
import {DogService} from "../../services/DogService/dog.service";
import {Dogpass} from "../../data-models/dogpass";

import {Observable} from 'rxjs/Rx'
import {OwnerDialogComponent} from "./dialogs/owner-dialog/owner-dialog.component";
import {TournamentDialogComponent} from "./dialogs/tournament-dialog/tournament-dialog.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Breeder} from "../../data-models/breeder";
import {BreederDialogComponent} from "./dialogs/breeder-dialog/breeder-dialog.component";
import {ClubDialogComponent} from "./dialogs/club-dialog/club-dialog.component";
import {Club} from "../../data-models/club";
import {Dogowner} from "../../data-models/dogowner";
import {BreederService} from "../../services/BreederService/breeder.service";
import {ClubService} from "../../services/ClubService/club.service";
import {TournamentService} from "../../services/TournamentService/tournament.service";
import {OwnerService} from "../../services/OwnerService/owner.service";

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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('filterBreeder') filterBreeder: ElementRef;
  @ViewChild('filterClub') filterClub: ElementRef;
  @ViewChild('filterOwner') filterOwner: ElementRef;
  @ViewChild('filterTournament') filterTournament: ElementRef;


  dataSource: UserDataSource | null;
  dataSourceTournament: TournamentDataSource | null;
  dataSourceBreeder: BreederDataSource | null;
  dataSourceOwner: OwnerDataSource | null;
  dataSourceClub: ClubDataSource | null;


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  tournaments: Observable<Tournament[]>;
  selected: any;


  ngOnInit() {

    this.onLoadClick();
    this.loadData();


    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });


  }


  displayedColumns = ['name', 'owner', 'breeder', 'action'];
  displayedColumsTournament = ['title', 'club', 'date', 'action'];
  displayedColumnsOwner = ['ownerfirstname', 'ownerlastname', 'action'];
  displayedColumnsBreeder = ['breederid','breederfirstname', 'breederlastname', 'kennelname', 'action'];
  displayedColumnsClub = ['clubname', 'city', 'action'];


  constructor(public dialog: MatDialog, private http: HttpClient, private dogService: DogService,
              private breederService: BreederService, private clubService: ClubService,
              private ownerService: OwnerService, private tournamentService: TournamentService,
              private _formBuilder: FormBuilder) {

  }

  onCreateBreederClick(breeder: Breeder) {
    const dialogRef = this.dialog.open(BreederDialogComponent, {
      data: {breeder: breeder }
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
    let dialogRef = this.dialog.open(DogDialogComponent, {
      data: {dog: dog}
    });


    dialogRef.afterClosed().take(1).subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
      //   if (result === 1) {

      // After dialog is closed we're doing frontend updates
      // For add we're just pushing a new row inside DataService
      console.log('test after closed' + result)
      this.dogService.dataChange.value.push(this.dogService.getDialogData());
      this.refreshTableDogpass();
     // this.dogService.resetDialogData();
      //this.onLoadClick();
      // }

    });
  }

  onCreateOwnerClick(dogowner: Dogowner) {
    const dialogRef = this.dialog.open(OwnerDialogComponent, {
      data: {dogowner: dogowner }
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

  onCreateTournamentClick(tournament: Tournament) {
    const dialogRef = this.dialog.open(TournamentDialogComponent, {
      data: {tournament: tournament }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.tournamentService.dataChange.value.push(this.tournamentService.getDialogData());
        this.refreshTableTournament();
      }
    });
  }

  onCreateClubClick(club: Club) {
    const dialogRef = this.dialog.open(ClubDialogComponent, {
      data: {club: club }
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


  onLoadClick() {
    //this.dataSource = new UserDataSource(this.dogService, this.paginator, this.sort);
    this.loadData();
    this.loadDataTournaments();
    this.loadDataBreeder();
    //this.dataSourceBreeder = new BreederDataSource(this.dogService, this.sort);
    this.loadDataOwner();
    this.loadDataClub();
    this.tournaments = this.dogService.getTournaments();

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

  refresh() {
    this.loadData();
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
        if (!this.dataSourceClub) {
          return;
        }
        this.dataSourceOwner.filter = this.filterOwner.nativeElement.value;
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




