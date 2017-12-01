import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {
  MatMenuTrigger, MatPaginator, MatPaginatorModule, MatSort, MatSortModule,
  MatTableDataSource
} from "@angular/material";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DogDialogComponent} from "./dog-dialog/dog-dialog.component";
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
import {DogService} from "../../services/dog.service";

import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {OwnerDialogComponent} from "./owner-dialog/owner-dialog.component";
import {TournamentDialogComponent} from "./tournament-dialog/tournament-dialog.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Breeder} from "../../data-models/breeder";
import {BreederDialogComponent} from "./breeder-dialog/breeder-dialog.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: UserDataSource | null;
  dataSourceTournament: TournamentDataSource | null;
  dataSourceBreeder: BreederDataSource | null;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  tournaments: Observable<Tournament[]>;
  selected: any;


  ngOnInit() {
    this.dataSource = new UserDataSource(this.dogService, this.sort);
    this.dataSourceTournament = new TournamentDataSource(this.dogService, this.sort);
    this.dataSourceBreeder = new BreederDataSource(this.dogService, this.sort);
    this.tournaments = this.dogService.getTournaments();

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });


  }


  displayedColumns = ['name', 'owner', 'action'];
  displayedColumsTournament = ['title', 'date', 'action'];
  displayedColumnsBreeder = ['breederfirstname', 'breederlastname', 'kennelname', 'action'];


  constructor(public dialog: MatDialog, private http: HttpClient, private dogService: DogService, private _formBuilder: FormBuilder) {
    this.dogService.getDogs();
    this.dogService.getTournaments()
  }
  onCreateBreederClick() {
    let dialogRef = this.dialog.open(BreederDialogComponent);
  }
  onCreateDogClick() {
    let dialogRef = this.dialog.open(DogDialogComponent);
  }

  onCreateOwnerClick() {
    let dialogRef = this.dialog.open(OwnerDialogComponent);
  }

  onCreateTournamentClick() {
    let dialogRef = this.dialog.open(TournamentDialogComponent);
  }


  onLoadClick() {
    this.dataSource = new UserDataSource(this.dogService, this.sort);
    this.dataSourceTournament = new TournamentDataSource(this.dogService, this.sort);
    this.dataSourceBreeder = new BreederDataSource(this.dogService, this.sort);
    this.tournaments = this.dogService.getTournaments();

  }


}

export class TournamentDataSource extends DataSource<any> {
  constructor(private dogService: DogService,
              private sort: MatSort) {
    super();
  }

  connect(): Observable<Tournament[]> {
    return this.dogService.getTournaments();
  }

  disconnect() {
  }
}

export class BreederDataSource extends DataSource<any> {
  constructor(private dogService: DogService,
              private sort: MatSort) {
    super();
  }

  connect(): Observable<Breeder[]> {
    return this.dogService.getBreeders();
  }

  disconnect() {
  }
}


export class UserDataSource extends DataSource<any> {


  constructor(private dogService: DogService,
              private sort: MatSort) {
    super();
  }

  connect(): Observable<Dog[]> {
    return this.dogService.getDogs();

    // https://github.com/angular/material2/issues/8283
  }


  disconnect() {
  }
}

export interface Tournament {
  id: number;
  title: string;
  date: Date;
}


export interface Dog {
  name: string;
  owner: Owner;
}

export interface Owner {
  firstname: string;
  lastname: string;
}


