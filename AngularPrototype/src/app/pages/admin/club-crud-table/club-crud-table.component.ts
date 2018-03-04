import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Club} from "../../../data-models/club";
import {ClubDialogComponent} from "../dialogs/club-dialog/club-dialog.component";
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {Observable} from "rxjs/Rx";
import {ClubService} from "../../../services/ClubService/club.service";
import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import {HttpClient} from "@angular/common/http";
import {BreederEditDialogComponent} from "../dialogs/breeder-dialog/breeder-edit-dialog/breeder-edit-dialog.component";
import {BreederDeleteDialogComponent} from "../dialogs/breeder-dialog/breeder-delete-dialog/breeder-delete-dialog.component";
import {Tournament} from "../../../data-models/tournament";
import {ClubEditDialogComponent} from "../dialogs/club-dialog/club-edit-dialog/club-edit-dialog.component";
import {ClubDeleteDialogComponent} from "../dialogs/club-dialog/club-delete-dialog/club-delete-dialog.component";

@Component({
  selector: 'app-club-crud-table',
  templateUrl: './club-crud-table.component.html',
  styleUrls: ['./club-crud-table.component.css']
})
export class ClubCrudTableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginatorClub') paginatorClub: MatPaginator;
  @ViewChild('filterClub') filterClub: ElementRef;

  displayedColumnsClub = ['clubname', 'city', 'action'];
  dataSourceClub: ClubDataSource | null;
  id: number;



  constructor(public dialog: MatDialog, private http: HttpClient, private clubService: ClubService) { }

  ngOnInit() {
    this.loadDataClub();
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



  startEdit(id: number, clubname: string, street: string, postalcode: string, city: string, country: string) {
    this.id = id;
    const dialogRef = this.dialog.open(ClubEditDialogComponent, {
      data: {id: id, clubname: clubname,  street: street, postalcode: postalcode, city: city, country: country}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.clubService.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.clubService.dataChange.value[foundIndex] = this.clubService.getDialogData();
        // And lastly refresh table
        this.refreshTableClub();
      }
    });
  }

  deleteItem(id: number, clubname: string) {
    this.id = id;
    const dialogRef = this.dialog.open(ClubDeleteDialogComponent, {
      data: {id: id, clubname: clubname}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.clubService.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.clubService.dataChange.value.splice(foundIndex, 1);
        this.refreshTableClub();
      }
    });
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
