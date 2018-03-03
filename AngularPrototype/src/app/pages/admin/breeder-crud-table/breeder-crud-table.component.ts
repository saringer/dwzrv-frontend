import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {BreederService} from "../../../services/BreederService/breeder.service";
import {HttpClient} from "@angular/common/http";
import {BreederDialogComponent} from "../dialogs/breeder-dialog/breeder-dialog.component";
import {Breeder} from "../../../data-models/breeder";
import {Observable} from "rxjs/Rx";
import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-breeder-crud-table',
  templateUrl: './breeder-crud-table.component.html',
  styleUrls: ['./breeder-crud-table.component.css']
})
export class BreederCrudTableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginatorBreeder') paginatorBreeder: MatPaginator;
  @ViewChild('filterBreeder') filterBreeder: ElementRef;

  displayedColumnsBreeder = ['breederid', 'breederfirstname', 'breederlastname', 'kennelname', 'action'];
  dataSourceBreeder: BreederDataSource | null;


  constructor(private breederService: BreederService, public dialog: MatDialog, private http: HttpClient) { }

  ngOnInit() {
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
