import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {OwnerService} from "../../../services/OwnerService/owner.service";
import {Dogowner} from "../../../data-models/dogowner";
import {OwnerDialogComponent} from "../dialogs/owner-dialog/owner-dialog.component";
import {Observable} from "rxjs/Rx";
import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {OwnerEditDialogComponent} from "../dialogs/owner-dialog/owner-edit-dialog/owner-edit-dialog.component";
import {OwnerDeleteDialogComponent} from "../dialogs/owner-dialog/owner-delete-dialog/owner-delete-dialog.component";

@Component({
  selector: 'app-owner-crud-table',
  templateUrl: './owner-crud-table.component.html',
  styleUrls: ['./owner-crud-table.component.css']
})
export class OwnerCrudTableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginatorOwner') paginatorOwner: MatPaginator;
  @ViewChild('filterOwner') filterOwner: ElementRef;

  displayedColumnsOwner = ['ownerfirstname', 'ownerlastname', 'action'];
  dataSourceOwner: OwnerDataSource | null;
  id: number;

  constructor(public dialog: MatDialog, private http: HttpClient,private ownerService: OwnerService) { }

  ngOnInit() {
    this.loadDataOwner();

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


  startEdit(id: number, firstname: string, lastname: string, street: string, postalcode: string, city: string, country: string) {
    this.id = id;
    const dialogRef = this.dialog.open(OwnerEditDialogComponent, {
      data: {id: id, firstname: firstname, lastname: lastname,  street: street, postalcode: postalcode, city: city, country: country}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.ownerService.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.ownerService.dataChange.value[foundIndex] = this.ownerService.getDialogData();
        // And lastly refresh table
        this.refreshTableOwner();
      }
    });
  }

  deleteItem(id: number, firstname: string, lastname: string) {
    this.id = id;
    const dialogRef = this.dialog.open(OwnerDeleteDialogComponent, {
      data: {id: id, firstname: firstname, lastname: lastname}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.ownerService.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.ownerService.dataChange.value.splice(foundIndex, 1);
        this.refreshTableOwner();
      }
    });
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
