import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {DogService} from "../../../services/DogService/dog.service";
import {Dogpass} from "../../../data-models/dogpass";
import {DogDialogComponent} from "../dialogs/dog-dialog/dog-dialog.component";
import {Observable} from "rxjs/Rx";
import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-dog-crud-table',
  templateUrl: './dog-crud-table.component.html',
  styleUrls: ['./dog-crud-table.component.css']
})
export class DogCrudTableComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  displayedColumns = ['name', 'owner', 'breeder', 'action'];
  dataSource: UserDataSource | null;


  constructor(public dialog: MatDialog, private http: HttpClient, private dogService: DogService) { }

  ngOnInit() {
    this.loadData();

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
