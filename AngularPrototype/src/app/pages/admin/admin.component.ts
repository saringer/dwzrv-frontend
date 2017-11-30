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

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  clickmessage = '';
  dataSource: UserDataSource | null;
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;


  ngOnInit() {
    this.dataSource = new UserDataSource(this.dogService, this.sort);



  }




  displayedColumns = ['name', 'owner', 'action'];


  constructor(public dialog: MatDialog, private http: HttpClient, private dogService: DogService) {
        this.dogService.getDogs();
  }





  openDialog() {

  }


  onCreateDogClick() {
    let dialogRef = this.dialog.open(DogDialogComponent);
  }
  onCreateOwnerClick() {
    let dialogRef = this.dialog.open(OwnerDialogComponent);
  }


  onLoadClick() {
    this.dataSource = new UserDataSource(this.dogService, this.sort);

  }


}




export class UserDataSource extends DataSource<any> {
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  subject:BehaviorSubject<Dog[]>;


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

/*export class UserDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: Dog[] = [];
  renderedData: Dog[] = [];

  constructor(private _service: DogService,
              private _sort: MatSort) {
    super();

    this._filterChange.subscribe();
  }

  connect(): Observable<Dog[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._service.dataChange,
      this._sort.sortChange,
      this._filterChange,
    ];

    this._service.getDogs().subscribe();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._service.data.filter((item: Dog) => {
        let searchStr = (item.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
     // const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      //this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
     // return this.renderedData;
      return sortedData;
    });
  }

  disconnect() {}

  sortData(data: Dog[]): Dog[] {
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        //case 'userName': [propertyA, propertyB] = [a.name, b.name]; break;
        //case 'progress': [propertyA, propertyB] = [a.progress, b.progress]; break;
        //case 'color': [propertyA, propertyB] = [a.color, b.color]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}*/


export interface Dog {
  name: string;
  //ownerid: number;
}



