import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {BreederService} from "../../../services/BreederService/breeder.service";
import {HttpClient} from "@angular/common/http";
import {BreederDialogComponent} from "../dialogs/breeder-dialog/breeder-dialog.component";
import {Breeder} from "../../../data-models/breeder";
import {Observable} from "rxjs/Rx";
import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {BreederEditDialogComponent} from "../dialogs/breeder-dialog/breeder-edit-dialog/breeder-edit-dialog.component";
import {BreederDeleteDialogComponent} from "../dialogs/breeder-dialog/breeder-delete-dialog/breeder-delete-dialog.component";
import {SearchService} from "../../../services/SearchService/search.service";
import {Club} from "../../../data-models/club";

@Component({
  selector: 'app-breeder-crud-table',
  templateUrl: './breeder-crud-table.component.html',
  styleUrls: ['./breeder-crud-table.component.css']
})
export class BreederCrudTableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginatorBreeder') paginatorBreeder: MatPaginator;

  displayedColumnsBreeder = ['firstname', 'lastname', 'kennelname', 'action'];
  dataSourceBreeder: BreederDataSource | null;
  id: number;


  constructor(private searchService: SearchService, private breederService: BreederService, public dialog: MatDialog, private http: HttpClient) {
  }

  ngOnInit() {
    this.paginatorBreeder._intl.itemsPerPageLabel = 'Pro Seite: ';
    this.paginatorBreeder._intl.nextPageLabel = 'Nächste Seite';
    this.paginatorBreeder._intl.previousPageLabel = 'Vorherige Seite';
    this.loadDataBreeder();
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

  startEdit(id: number, firstname: string, lastname: string, kennelname: string, street: string, postalcode: string, city: string, country: string) {
    this.id = id;
    const dialogRef = this.dialog.open(BreederEditDialogComponent, {
      data: {
        id: id,
        firstname: firstname,
        lastname: lastname,
        kennelname: kennelname,
        street: street,
        postalcode: postalcode,
        city: city,
        country: country
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.breederService.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.breederService.dataChange.value[foundIndex] = this.breederService.getDialogData();
        // And lastly refresh table
        this.refreshTableBreeder();
      }
    });
  }

  deleteItem(id: number, firstname: string, lastname: string) {
    this.id = id;
    const dialogRef = this.dialog.open(BreederDeleteDialogComponent, {
      data: {id: id, firstname: firstname, lastname: lastname}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.breederService.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.breederService.dataChange.value.splice(foundIndex, 1);
        this.refreshTableBreeder();
      }
    });
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
      this.searchService.currentMessage.subscribe(message => this.dataSourceBreeder.filter = message);

    }
  }

  public loadDataBreeder() {
    this.dataSourceBreeder = new BreederDataSource(this.breederService, this.paginatorBreeder, this.sort);
    if (!this.dataSourceBreeder) {
      return;
    }
    else {
      this.searchService.currentMessage.subscribe(message => this.dataSourceBreeder.filter = message);
    }
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
        const searchStr = (breeder.firstname + breeder.lastname + breeder.kennelname).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      //const sortedData = this.sortData(this.filteredData.slice());
      const sortedData = this.getSortedData(this.filteredData.slice());



      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginatorBreeder.pageIndex * this._paginatorBreeder.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginatorBreeder.pageSize);
      return this.renderedData;

    });

  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  getSortedData(breeders: Breeder[]): Breeder[] {
    const data = breeders;
    if (!this._sort.active || this._sort.direction == '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';


      switch (this._sort.active) {
        case 'city':
          [propertyA, propertyB] = [a.kennelname, b.kennelname];
          break;
        case 'clubname':
          [propertyA, propertyB] = [a.firstname, b.firstname];
          break;
        case 'city':
          [propertyA, propertyB] = [a.lastname, b.lastname];
          break;

      }


      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });

  }


}
