import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatMenuTrigger, MatTableDataSource} from "@angular/material";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DogDialogComponent} from "./dog-dialog/dog-dialog.component";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {CompetitionService} from "../../forms/dog-form/shared.services";
import {DataSource} from "@angular/cdk/collections";
import {Dogpass} from "../../data-models/dogpass";
import {Http} from "@angular/http";
import {CollectionViewer} from "@angular/cdk/typings/collections";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private dogsUrl = 'http://localhost:8080/dogs';  // URL to web api
  clickmessage = '';

  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;


  ngOnInit() {
   // this.http.get(this.dogsUrl).subscribe(data => {

    this.dataSource = new ExampleDataSource(this.exampleDatabase);


  }

  getStuff() {
   // return this.http.get<Dogpass[]>(this.dogsUrl);
    this.http.get<ItemsResponse[]>(this.dogsUrl).subscribe(data => {
    });
  }


  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;


  displayedColumns = ['dog', 'owner', 'action'];


  constructor(public dialog: MatDialog, private http: HttpClient) {

  }

  openDialog() {

  }


  onCreateClick() {
    this.getStuff()
    //this.getHeroes();
    let dialogRef = this.dialog.open(DogDialogComponent);

  }



}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Element[]> = new BehaviorSubject<Element[]>([]);
  get data(): Element[] { return this.dataChange.value; }

  constructor() {
    // Fill up the database with 100 users.
   // for (let i = 0; i < 100; i++) { this.addUser(); }
  }



}

export class ExampleDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: ExampleDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    console.log('ExampleDataSource#connect')
    return this._exampleDatabase.dataChange;
  }

  disconnect() {}
}



interface ItemsResponse {
  id: number,
  passport_no: string,
  name: string,
  race: string,
  sex: string,
  chip_no: number,
  coat_colour: string,
  breeder: string,
  date_of_birth: Date,
  owner_id: number
}


export interface Element {
  dogname: string;
  dogowner: string;
}

const myData: Element[] = [
];

const ELEMENT_DATA: Element[] = [
];

